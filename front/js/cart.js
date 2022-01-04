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
productImg.alt = productLocalStorage [produit] . altImgProduct;

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

const resultFinal = productLocalStorage.final ((el) => el.qttModifValue !== changeQuantity);
resultSearch.productQuantity = qttModifValue;
productLocalStorage [k].productQuantity = resultSearch.productQuantity;

localStorage.setItem ("produits", JSON.stringify (productLocalStorage));

// actualisation
location.reload();
        })
    }
}

// Suppression d'un produit
