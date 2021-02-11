

const dataManager = new DataManager();
dataManager.cartCounter();

total = 0;
const cart = new Cart();
let cartContent = cart.displayCart();

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
let elt = document.querySelectorAll(`td img`);
for(let i = 0;i<localStorage.length;i++){
    elt[i].onclick = function() {
        //voir l'id du bouton poubelle cliqué
        let idToRemove = elt[i].getAttribute('id');
        //supprimer l'article correspondant
        localStorage.removeItem(`article${idToRemove}`);
        location.reload();
    };                                                
};


//récupération du contenu du formulaire 
let input = document.getElementsByTagName('input');
var formContent ={};
for(let i = 0; i < input.length-1;i++){  
    input[i].addEventListener('change', function(){
        let firstName = document.getElementById('validationServer01').value;
        let lastName = document.getElementById('validationServer02').value;
        let address = document.getElementById('validationServer03').value;
        let city = document.getElementById('validationServer05').value;
        let email = document.getElementById('validationServerUsername').value;    
        formContent={firstName, lastName, address, city, email}; //à envoyer au post fetch   
//tests validation champ
//          if(input[i].value == ""){ //si espace, ça valide?
//             input[i].classList.add('is-invalid');
//             input[i].classList.remove('is-valid');
//         }else{
//             if(i===2 && input[i].value !== /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i){ //regex format email, marche pas
//                 input[i].classList.add('is-invalid');
//                 input[i].classList.remove('is-valid');
//             }else{
//             input[i].classList.add('is-valid');
//             input[i].classList.remove('is-invalid');
//             };
//         }; 
    });
};

//validation commande
let submitForm = document.getElementById('form');
submitForm.addEventListener('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    let confirm = window.confirm("Voulez vous vraiment soumettre les informations?");
    if(!confirm){
        return;
    }
   submit(formContent, cartContent);
});

async function submit (formContent, cartContent){
    const response = await dataManager.postOrderRequest(formContent, cartContent);
    dataManager.saveOrder(response.orderId, response.contact, total);
    window.location = "./confirm.html?"+response.orderId;
}