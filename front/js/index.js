 //Récupération du tableau de produits disponibles
allArticles();

function allArticles() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .catch((e) => {
      const productsContainer = document.querySelector(".items");
      productsContainer.innerHTML = "Oups, Vérifiez votre connexion";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30vh 0";
    })

    // Répartition des données pour chaque produits dans le DOM
    .then(function (resultatApi) {
      const articles = resultatApi;
      console.log(articles);
      //Boucle pour chaque itération d'un produit
      for (let article in articles) {
        // élément "a"
        const productLink = document.createElement("a");
        document.querySelector(" .items").appendChild(productLink);
        productLink.href = `product.html?id=${resultatApi[article]._id}`;

        // élément "article"
        const productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        // élément "image"
        const productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = resultatApi[article].imageUrl;
        productImg.alt = resultatApi[article].altTxt;

        // élément "h3"
        const productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("nom_produit");
        productName.innerHTML = resultatApi[article].name;

        // élément "p"
        const productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("nom_produit");
        productDescription.innerHTML = resultatApi[article].description;
      }
    });
  console.log("création produits: ok");
}
