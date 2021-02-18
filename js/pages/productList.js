class ProductList{
    constructor(){
        
    }

    async html(){
        let html = "";
        const articlesList = await dataManager.getAllProducts();
        for(let i = 0; i<articlesList.length; i++){
            html +=
                `<div class="card">
                    <img src="${articlesList[i].imageUrl}" lazy class="card-img-top" alt="Nounours super classe">
                    <h2 class="card-title">${articlesList[i].name}</h2>
                    <p class="card-text">${articlesList[i].description}</p>
                    <button class="btn btn-primary" onclick="pageManager.changePage('product_${articlesList[i]._id}')">Afficher</button>
                </div>`;
        };
        return `
        <h1>Trouvez le nounours de vos rêves</h1>
        <div id="product_container">
            ${html}
        </div>`;
    }
}