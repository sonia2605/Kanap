allProducts ();

function allProducts(){
  getArticles();
}

// Récupération de la liste Produits avec l'API
function getArticles () {
fetch ("http://localhost:3000/api/products")
.then(function (res){
return res.json ();
})
.catch ((error) => {
  let productsContainer = document.querySelector(".items");
  items.innerHTML = 
  "Oups ! Vérifiez votre connexion ...";
  items.style.textAlign = "center";
  items.style.width = "38vh 0";
})

// Mise en place des données de l'API dans le DOM
async function getProducts () {
  var result = await getArticles ()
  .then (function (resultAPI) {
    const articles = resultAPI;
    console.log(articles);
    for(let article in articles)
  {
// élément "a"
let productLink = document.createElement ("a");
document.querySelector(".items") .appendChild (productLink);
productLink.href = `product.html?id=${resultAPI [article]. _id}`;

// élément "article"
let productArticle = document.createElement ("article");
productLink.appendChild (productArticle);

// élément "image"
let productImg = document.createElement ("img");
productArticle.appendChild(productImg);
productImg.src= resultAPI [article].imageUrl;
productImg.alt=resultAPI[article].altTxt;

// élément "h3"
let productName = document.createElement("h3");
productArticle.appendChild(productName);
productName.classList.add("nom_produit");
productName.innerHTML = resultAPI[article].name;

// élément "p"
let productDescription = document.createElement ("p");
productArticle.appendChild (productDescription);
productDescription.classList.add("nom_produit");
productDescription.innerHTML=resultAPI[article].description;

// élément "price"
let productPrice = document.createElement ("div");
productInfosDiv.appendChild (productPrice);
productPrice.classList.add("product_infos_price");

// Formatage prix en euro
resultAPI [article].prix= resultAPI[article].prix/100;
productPrice.innerHTML = new Intl.NumberFormat ("fr-FR", {
 style : "monnaie",
  devise : "EUR",
}).format(resultAPI[article].prix);
  }
})
.catch (function(error){
return error;
});
console.log("Les produits sont importés avec succès !");
}

}