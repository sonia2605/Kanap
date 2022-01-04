// mise en place du stockage sur navigateur
let productLocalStorage = JSON.parse (localStorage.getItem("produit"));
console.table(productLocalStorage);
const viewEmptyCart = document.querySelector("#cart_items");

// panier vide 
function getCart (){
    if(productLocalStorage === null || productLocalStorage == 0){
        const emptyCart = <p>Le panier est vide</p>;
        positionEmptyCart .innerHTML = emptyCart;
    }else {
        for (let produit in productLocalStorage){
// élément "article"
let productArticle = document.createElement("article");
document.querySelector("#cart_items") .appendChild(productArticle);
productArticle.className = "cart_item";
productArticle.setAttribute ("data-id", productLocalStorage[produit] .idProduit);

// élément "div"
let productDivImg = document.createElement ("div");
productArticle.appendChild (productDivImg);
productDivImg.className = "cart_item_img";

// élément "image"
let productImg = document.createElement ("img");
productDivImg.appendChild (productImg);
productImg.src = productLocalStorage [produit] .imgProduct;
productImg.alt = productLocalStorage [produit] .altImgProduct;

// élément "div" 
let productItemContent = document.createElement ("div");
productArticle.appendChild (productItemContent);
productItemContent.className = "cart_item_content";

// élément "div"
let productItemContentTitlePrice = document.createElement ("div");
productItemContent.appendChild (productItemContentTitlePrice);
productItemContentTitlePrice.className = "cart_item_content_titlePrice";

// élément "h2"
let productTitle = document.createElement ("h2");
productItemContentTitlePrice.appendChild (productTitle);
productTitle.innerHTML = productLocalStorage[produit] .nomProduit;

// élément "couleur"
let productColor = document.createElement ("p");
productTitle.appendChild (productColor);
productColor.innerHTML = productLocalStorage [produit] .couleurProdui;
productColor.style.fontSize = "2em";

// élément "prix"
let productPrice = document.createElement("p");
productItemContentTitlePrice.appendChild (productPrice);
productPrice.innerHTML = productLocalStorage [produit] .prixProduit + "€";

// élément "div"
let productItemContentSettings = document.createElement ("div");
productItemContent.appendChild (productItemContentSettings);
productItemContentSettings.className = "cart_item_content_settings";

// élément "div"
let productItemContentSettingsQuantity = document.createElement ("div");
productItemContentSettings.appendChild (productItemContentSettingsQuantity);
productItemContentSettingsQuantity.className = "cart_item_content_settings_quantity";

// élément "Qté"
let productQte = document.createElement ("p");
productItemContentSettingsQuantity.appendChild (productQte);
productQte.innerHTML = "Qté :";

// élément "quantité"
let productQuantity = document.createElement ("entrée");
productItemContentSettingsQuantity.appendChild (productQuantity);
productQuantity.value = productLocalStorage [produit].productQuantity;
productQuantity.className = "itemQuantity";
productQuantity.setAttribute("type", "nombre");
productQuantity.setAttribute("min", "1");
productQuantity.setAttribute("max", "100");
productQuantity.setAttribute("nom", "quantité");

// élément "div"
let productItemContentSettingsDelete = document.createElement("div");
productItemContentSettings.appendChild (productItemContentSettingsDelete);
productItemContentSettingsDelete.className = "cart_item_content_settings_delete";

// élément supprimer "p"
let productSuppr = document.createElement("p");
productItemContentSettingsDelete.appendChild (productSuppr);
productSuppr.className = "deleteItem";
productSuppr.innerHTML = "Supprimer";

    }
    }}
getCart();

function getTotal (){

// Total des quantités
var elemsQtt = document.getElementsByClassName ("itemQuantity");
var myLength = elemsQtt.length,
totalQtt = 0;

for (var i=0; i< myLength; ++ i) {
    totalQtt += elemsQtt[i].valueAsNumber;
}

let productTotalQuantity = document.getElementById ("totalQuantity");
productTotalQuantity.innerHTML = totalQtt;
console.log (totalQtt);

// Prix total 
totalPrice = 0;

for (var i=0; i< myLength; ++i){
    totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage [i].prixProduit);
}
let productTotalPrice = document.getElementById ("totalPrice");
productTotalPrice.innerHTML = totalPrice;
console.log(totalPrice);
}

getTotal();

// Pour modifier la quantité d'un produit
function changeQtt () {
    let qttModif = document.querySelectorAll (".itemQuantity");

    for (let k=0; k<qttModif.length; k++){
        qttModif[k].addEventListener ("changer", (Event) => {
            Event.preventDefault();

// élément à modifier suivant son ID et sa couleur
let changeQuantity = productLocalStorage [k].productQuantity;
let qttModifValue = qttModif[k].valueAsNumber;

const resultFind = productLocalStorage.find ((el) => el.qttModifValue !== changeQuantity);
resultFind.productQuantity = qttModifValue;
productLocalStorage [k].productQuantity = resultFind.productQuantity;

localStorage.setItem ("produit", JSON.stringify (productLocalStorage));

// actualisation
location.reload();
        })
    }
}
changeQtt ();
// Suppression d'un produit
function productDelete (){
    let btn_supprimer = document.querySelectorAll (".deleteItem");
    for(let j = 0; j<btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("clic", (Event) => {
            Event.preventDefault ();
// élément à supprimer suivant son ID et sa couleur
let idDelete = productLocalStorage[j].idProduct;
let colorDelete = productLocalStorage[j].colorProduct;

productLocalStorage = productLocalStorage.filter (el => el.idProduct !== idDelete || el.colorProduct !== colorDelete);
localStorage.setItem ("produit", JSON.stringify(productLocalStorage));

// Alerte sur un produit supprimé + actualisation
alert ("produit supprimé");
location.reload();
        })
    }
}

productSuppr ();

// formulaire
function getForm(){
// Mise en place des Regex 
let form = document.querySelector (".cart_order_form");

// Mise en place des expressions régulières
let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[az]{2,10}$');
let charRegExp = new RegExp ("^[a-zA-Z,.'-]+$");
let addressRegExp = new RegExp ("^[0-9]{1,3}(?:(?:[,.]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+" );

// Ecoute de la modification du prénom
form.prénom.addEventListener ("modifier", function(){
    validFirstName (this);
});

// Ecoute de la modification du nom
form.nom.addEventListener ("modifier", function(){
    validLastName (this);
});

// Ecoute de la modification de l'adresse
form.adresse.addEventListener ("modifier", function () {
    validAddress (this);
});

// Ecoute de la modification de la ville
form.ville.addEventListener ("modifier", function(){
    validCity (this);
});

// Ecoute de la modification de l'email
form.courriel.addEventListener ("modifier", function(){
    validEmail (this);
});

// Validation du prénom
const validFirstName = function (inputFirstName){
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test (inputFirstName.value)){
        firstNameErrorMsg.innerHTML = '';
    }else{
        firstNameErrorMsg.innerHTML = 'Renseignez ce champ';
    }
    };


// Validation du nom 
const validLastName = function(inputLastName){
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if(charRegExp.test (inputLastName.value)){
        lastNameErrorMsg.innerHTML = '';
    }else{
        lastNameErrorMsg.innerHTML = 'Renseignez ce champ';
    }
    };

// Validation de l'adresse
const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if(addressRegExp.test (inputAddress.value)){
        addressErrorMsg.innerHTML = '';
    }else{
        addressErrorMsg.innerHTML = 'Renseigner ce champ';
    }
    };

    // Validation de la ville 
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test (inputCity.value)){
            cityErrorMsg.innerHTML = '';
        }else{
            cityErrorMsg.innerHTML = 'Renseignez ce champ';
        }
        };

    // Validation de l'email
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test (inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        }else{
            emailErrorMsg.innerHTML = 'Renseignez ce champ';
        }
        };
    
    }
getForm ();

// Envoi des infos client au localStorage

function postForm (){
    const btn_commander = document.getElementById ("commander");

// Ecoute du panier
btn_commander.addEventListener ("clic", (Event) => {

// Récupération du formulaire client
let inputFirstName = document.getElementById ("prénom");
let inputLastName = document.getElementById ("nom");
let inputAddress = document.getElementById ("adresse");
let inputCity = document.getElementById ("ville");
let inputEmail = document.getElementById ("email");

// Construction du tableau avec le LocalStorage
let idProducts = [];
for (let i=0; i< productLocalStorage.length; i++) {
    idProducts.push (productLocalStorage [i].idProduit)
}
console.log (idProducts);

const order = {
contacter : {
    firstName : inputFirstName.value,
    lastName : inputLastName.value,
    addess : inputAddress.value,
    city : inputCity.value,
    email: inputEmail.value
},
produits : idProducts,
}
const options = {
    method : 'POST',
    body : JSON.stringify(order),
    Headers : {
        'Accepter': 'application/json',
        'Type de contenu': "application/json"
    },
};

fetch ( "http://localhost:3000/api/products/order", options)
.then ((response) => response.json ())
.then ((data) => {
    console.log (data);
    localStorage. errase ();
    localStorage.setItem ("orderId", data.orderId);

    document.location.href = "confirmation.html";
});
})
}
postForm ();






