//Récupération de l'id via les paramètres de l'url
const idProduct = new URL(window.location.href).searchParams.get("id");

//Récupération des sélecteurs pour les futurs modifications
const titleProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorsProduct = document.getElementById("colors");
const imgProduct = document.querySelector(".item__img");
const img = document.createElement("img");
imgProduct.appendChild(img);

//Récupération de l'article grace a l'id + affichage des données de ce dernier
getArticle();

//Récupération de l'article grace a l'id + affichage des données de ce dernier
async function getArticle() {
  await fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then((product) => {
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      titleProduct.innerHTML = product.name;
      priceProduct.innerHTML = product.price;
      descriptionProduct.innerHTML = product.description;
      document.title = product.name;

      for (let i = 0; i < product.colors.length; i++) {
        const color = document.createElement("option");
        color.setAttribute("value", product.colors[i]);
        color.innerHTML = product.colors[i];
        colorsProduct.appendChild(color);
      }
    });
}

// Ajout d'un article au panier
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {
  const colorChoice = document.querySelector("#colors");
  const quantityChoice = document.querySelector("#quantity");

  if (
    quantityChoice.value > 0 &&
    quantityChoice.value <= 100 &&
    quantityChoice.value != 0 &&
    colorChoice.value != 0
  ) {
    if (localStorage.getItem("cart")) {
      const productCart = JSON.parse(localStorage.getItem("cart"));
      //console.log('productCart');

      const colorKanap = document.querySelector("#colors").value;
      const qtyKanap = document.querySelector("#quantity").value;

      const resultFind = productCart.find(
        (el) => el.idKanap === idProduct && el.colorKanap === colorKanap
      );
      //Si le produit commandé est déjà dans le panier

      //console.log('resultFind');

      if (resultFind) {
        //console.log('"resultfind kanap = " + resultFind.qtyKanap');
        //console.log('"qtykanap = " + qtyKanap');
        const newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
        //console.log('"newQtt est egal a : " + newQuantite');
        resultFind.qtyKanap = newQuantite;
        localStorage.setItem("cart", JSON.stringify(productCart));

        // console.log(productCart);

        //Si le produit commandé n'est pas dans le panier
      } else {
        const productCart = JSON.parse(localStorage.getItem("cart"));
        productCart.push(productCartObj);
      }
    } else {
      const productCart = [];
      const nameKanap = document.querySelector("#title").textContent;
      const colorKanap = document.querySelector("#colors").value;
      const qtyKanap = document.querySelector("#quantity").value;
      const imgKanap = img.src;
      const altImg = img.alt;
      const priceKanap = document.querySelector("#price").textContent;
      //console.log('idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap');

      const productCartObj = {
        idKanap: idProduct,
        nameKanap: nameKanap,
        colorKanap: colorKanap,
        qtyKanap: qtyKanap,
        imgKanap: imgKanap,
        altImg: altImg,
        priceKanap: priceKanap,
      };

      productCart.push(productCartObj);

      const objCart = JSON.stringify(productCart);
      localStorage.setItem("cart", objCart);

      alert("Ajouté au panier !");
    }
  }
}
