let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
//console.table('productLocalStorage');
if (!productLocalStorage) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
} else {
  for (let i = 0; i < productLocalStorage.length; i++) {
    // Insertion de la balise "article"
    const productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

    // Insertion de "div" pour l'image produit
    const productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    const productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = productLocalStorage[i].imgKanap;
    productImg.alt = productLocalStorage.altImgProduit;

    // Insertion de l'élément "div" description produit
    const productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    const productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";

    // Insertion du h2
    const productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = productLocalStorage[i].nameKanap;

    // Insertion de la couleur
    const productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = productLocalStorage[i].colorKanap;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    const productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

    // Insertion de l'élément "div"
    const productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    const productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    // Insertion de "Qté : "
    const productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Qté : ";

    // Insertion de la quantité
    const productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = productLocalStorage[i].qtyKanap;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    const productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    const productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
    productSupprimer.addEventListener("click", (e) => {
      e.preventDefault;

      // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
      const deleteId = productLocalStorage[i].idKanap;
      const deleteColor = productLocalStorage[i].colorKanap;

      // filtrer l'élément cliqué par le bouton supprimer
      productLocalStorage = productLocalStorage.filter(
        (elt) => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor
      );

      // envoyer les nouvelles données dans le localStorage
      localStorage.setItem("cart", JSON.stringify(productLocalStorage));

      // avertir de la suppression et recharger la page
      alert("Votre article a été supprimé avec succès.");

      //Si aucun produit dans le localstorage, le panier est vide
      if (productLocalStorage.length === 0) {
        localStorage.clear();
      }
      //Actualisation rapide de la page
      location.reload();
    });
  }
}

function getTotals() {
  // Récupération des quantités
  const elemsQtt = document.getElementsByClassName("itemQuantity");
  let totalQtt = 0;

  for (var i = 0; i < elemsQtt.length; ++i) {
  totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log("totalQtt");

  // Le prix total
  totalPrice = 0;
  for (var i = 0; i < elemsQtt.length; ++i) {
  totalPrice += elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap;
  }

  const productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log("totalPrice");
}
getTotals();

function modifyQtt() {
  const qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      const quantityModif = productLocalStorage[k].qtyKanap;
      const qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = productLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.qtyKanap = qttModifValue;
      productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

      localStorage.setItem("cart", JSON.stringify(productLocalStorage));

      // Actualisation rapide
      location.reload();
    });
  }
}
modifyQtt();

//Formulaire Regex
function getForm() {
  // Ajout des Regex
  const form = document.querySelector(".cart__order__form");

  //Création expressions régulières
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  const charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  const addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute modification du nom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute modification de l'adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute modification de la ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute modification email
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
  const firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Renseignez ce champ";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
  const lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Renseignez ce champ";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
  const addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Renseignez ce champ";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
  const cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Renseignez ce champ";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
  const emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Renseignez votre email";
    }
  };
}
getForm();
function postForm() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupération des données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    //Construction d'un array d'id depuis le local storage
    const products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);

    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      products,
    };

    // j'envoie le formulaire + localStorage (sendFormData) au serveur

    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  }); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();
 