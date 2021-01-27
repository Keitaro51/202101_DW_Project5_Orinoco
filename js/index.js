//communication with API and retrieving the list of items 

let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const articlesList = JSON.parse(this.responseText); 
        showArticlesList(articlesList);
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

//creation of the blank card template and filling with the visible product info
function showArticlesList(articlesList){
    for(let i = 0; i<articlesList.length; i++){
        document.getElementById('product_container').insertAdjacentHTML(
            'beforeend', 
            `<div class="card" style="width: 18rem;">
                <img src="${articlesList[i].imageUrl}" lazy class="card-img-top" alt="Nounours super classe">
                <h2 class="card-title">${articlesList[i].name}</h2>
                <p class="card-text">${articlesList[i].description}</p>
                <a href="./product.html?${articlesList[i]._id}" class="btn btn-primary">Afficher</a>
            </div>`);
    }
}
