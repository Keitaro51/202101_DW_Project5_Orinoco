let total = 0;
displayCart();

//affiche le contenu du panier stocké en local
function displayCart() {
    console.log(localStorage);

    let boucle = localStorage.length+1;
    for (let i = 1; i < boucle; i++) {
        //récupération des info article
        let item = localStorage.getItem(`article${i}`);
        //si article manquant dans liste (ex : art1, art2, null, art4)
        if(item === null){
            boucle++;
        }else{
            //info articles concaténées dans localStorage => split puis affectation
            let splitItem = item.split(",");
            let name = splitItem[0];
            let color = splitItem[1];
            let price = parseInt(splitItem[2]);
            total += price;
            document.querySelector('table').insertAdjacentHTML(
                'beforeend',
                `<tr id="article${i}">
                    <td>Ourson ${name} - Couleur : ${color}</td>
                    <td>${price}</td>
                    <td><img src="./img/trash.svg" id="${i}"></td>
                </tr>`);       
        };
    };
};

//calcul du total
document.querySelector('table').insertAdjacentHTML(
    'beforeend',
    `<tr>
        <th colspan="3" id="Total">Total: ${total} doudoullars</th>
    </tr>`);

//desactiver boutons si panier vide
if(localStorage.length==0){
    let btn = document.querySelectorAll('.btn');
    for(i=0;i<btn.length;i++){
        btn[i].classList.add("disabled");
    };
};

//bouton vider le panier
document.getElementById('clearCartBtn').addEventListener('click', function () {
    //demande de confirmation
    if(window.confirm("Etes vous certain(e) de vouloir vider votre panier?")){
        localStorage.clear();
        location.reload();     
    };  
});

//bouton supprimer un article 
//localStorage stocké combien de temps? fermeture nav? onglet? session? depend des param? local ou localStorage?
let elt = document.querySelectorAll(`td img`);
for(let i = 0;i<localStorage.length;i++){
    elt[i].onclick = function() {
        //quand clic sur poubelle précise, alors regarder l'élément tr parent
        let articleToDelete = elt[i].parentElement.parentElement;
        //voir le n° de cet article
        let idRemove = articleToDelete.getAttribute('id');
        //suprimer cet article
        localStorage.removeItem(idRemove); ////a tester sans différencier poubelle et grand parent!!!!!!!!
        location.reload();
    };                                                
};


//après clic sur valider commande
//récupération du contenu du formulaire
    // let firstName = document.getElementById('validationServer01').value;
    // let lastName = document.getElementById('validationServer02').value;
    // let email = document.getElementById('validationServerUsername').value;
    // let address = document.getElementById('validationServer03').value;
    // let zip = document.getElementById('validationServer05').value;

   
    // let input = document.getElementsByTagName('input');
    // for(let i = 0; i < input.length-1;i++){  
    //     input[i].addEventListener('input', function(){
    //         if(input[i].value == ""){ //si espace, ça valide
    //             input[i].classList.add('is-invalid');
    //             input[i].classList.remove('is-valid');
    //         }else{
    //             if(i===2 && input[i].value!==/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i){ //regex format email, marche pas
    //                 input[i].classList.add('is-invalid');
    //                 input[i].classList.remove('is-valid');
    //             }else{
    //             input[i].classList.add('is-valid');
    //             input[i].classList.remove('is-invalid');
    //             };
    //         }; 
    //     });
    // };


let submitForm = document.getElementById('form');
submitForm.addEventListener('submit', function(e){
    let confirm = window.confirm("Voulez vous vraiment soumettre les informations?");
    console.log(confirm);
    console.log(!confirm);
    if(!confirm){
        e.preventDefault();
    };
});