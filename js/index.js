const dataManager = new DataManager();
showArticlesList();

/**
 * creation of the blank card template and filling with the visible product info
 *
 * @return  {void}  affiche les produits dans le DOM
 */
async function showArticlesList(){
    const articlesList = await dataManager.getAllProducts();
    for(let i = 0; i<articlesList.length; i++){
        document.getElementById('product_container').insertAdjacentHTML(
            'beforeend', 
            `<div class="card">
                <img src="${articlesList[i].imageUrl}" lazy class="card-img-top" alt="Nounours super classe">
                <h2 class="card-title">${articlesList[i].name}</h2>
                <p class="card-text">${articlesList[i].description}</p>
                <a href="./product.html?${articlesList[i]._id}" class="btn btn-primary">Afficher</a>
            </div>`);
    };
};