const dataManager = new DataManager();
let secondes = 10;

//récupérer orderId dans la barre d'adresse
const orderId = window.location.search.slice(1);
const orderRecap = dataManager.getOrder(orderId);

// récupérer et afficher info depuis sessionStorage
document.getElementsByTagName("h1")[0].innerText = "Félicitation "  + orderRecap.firstName;
document.getElementById("totalPrice").innerText = orderRecap.total;
document.getElementById("idNbr").innerText = orderId;

//vide le panier
dataManager.clearLocalData();

//redirection sur page d'accueil pour acheter encore plus de nounours
setTimeout(function () { window.location = "./index.html"; }, secondes * 1000);
changeTimeValue();
let timer = setInterval(changeTimeValue, 1000);


function changeTimeValue() {
    if (secondes > 1) {
        document.getElementById("compteur").innerHTML = secondes + " secondes";
    }

    else if (secondes >= 0) {
        document.getElementById("compteur").innerHTML = secondes + " seconde";
    }

    else {
        clearTimeout(timer);
    }
    secondes--;
}