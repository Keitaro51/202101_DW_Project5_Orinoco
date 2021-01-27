let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const articlesList = JSON.parse(this.responseText); 
        showArticlesList(articlesList);
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

//retrieving the product id in the url
function showArticlesList(articlesList){
    console.log(articlesList);
    let hash = window.location.search;
    let productId = hash.substr(1); //remove ? symbol into url hash
    for(let i = 0; i<articlesList.length; i++){
        if(productId === articlesList[i]._id){
            let result = i;
            currentArticle(result);
        };
    };
    //display product corresponding to id
    function currentArticle(result){
        console.log(result); 
        document.getElementById('main').insertAdjacentHTML('afterbegin',`<h1>Bonjour, je suis ${articlesList[result].name}. Tu veux etre mon amis?</h1>`);
        document.getElementById('product_container').insertAdjacentHTML(
            'beforeend', 
            `<div class="card" style="width: 18rem;">
                <img src="${articlesList[result].imageUrl}" lazy class="card-img-top" alt="Nounours super classe">
                <h2 class="card-title">${articlesList[result].name}</h2>
                <p class="card-text">${articlesList[result].description}</p>
                <label for="custon-config">Choisissez une couleur</label>
                    <select name="color" id="custon-config">
                        <option value="">--Please choose an option--</option>
                        
                    </select>
                <a href="./cart.html" class="btn btn-primary">Ajouter au panier</a>
            </div>`); 

            //display all custom color avaible
            function color(){
                for(let color of articlesList[result].colors){
                    document.getElementById('custon-config').insertAdjacentHTML(
                        'beforeend',
                        `<option value="">${color}</option>`);
                }
            }
            color();
    }     
   
}
