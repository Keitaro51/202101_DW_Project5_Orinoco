class Product {

    dataManager;
    colorChosen;
    teddy;

    constructor() {
        this.dataManager = new DataManager();
        this.showProduct();
    }

    /**
     * retrieve product id in url, display article and watch for color choice and add to cart btn
     */
    async showProduct() {
        //find article id in URL
        const hash = window.location.search;
        const productId = hash.substr(1);

        //retrieve product info from id
        this.teddy = await this.dataManager.getProductInfo(productId);
        //enregistre la valeur sélectionnée par défaut au lancement de la page
        this.colorChosen = this.teddy.colors[0]; 
        document.getElementById('main').insertAdjacentHTML('afterbegin', `<h1>Bonjour, je suis ${this.teddy.name.split(' ')[0]}. Tu veux être mon ami?</h1>`);
        document.getElementById('product_container').insertAdjacentHTML(
            'beforeend',
            `<div class="card">
                <img src="${this.teddy.imageUrl}" lazy class="card-img-top" alt="Nounours super classe">
                <h2 class="card-title">${this.teddy.name}</h2>
                <p class="card-text">${this.teddy.description}</p>
                <p class="card-text">Prix : ${this.teddy.price} Doudoullars</p>
                <label for="custon-config">Choisissez une couleur</label>
                    <select name="color" id="custon-config" required>         
                    </select>
                <button id="addcart" class="btn btn-primary">Ajouter au panier</button>
            </div>`);
        this.dataManager.cartCounter();

        //display all avaible colors in select element
        for (let color of this.teddy.colors) {
            document.getElementById('custon-config').insertAdjacentHTML(
                'beforeend',
                `<option value="${color}">${color}</option>`);
        };

        this.colorChoice();

        this.addToCart(productId);
    };

    /**
     * watch for selected custom color
     */
    colorChoice() {
        var colorSelector = document.getElementById('custon-config');
        colorSelector.addEventListener('change', (e) => {
            this.colorChosen = e.target.value;
        });
    };

    /**
     * initialisation du bouton et ajout d'un article dans le panier - alerte et stockage local
     */
    addToCart(productId) {
        let addCartBtn = document.getElementById('addcart');
        addCartBtn.addEventListener('click', () => {
            // regroupe les info utiles de l'article sélectionné pour mise en panier
            let articleToAdd = [`${this.teddy.name}`, this.colorChosen, `${this.teddy.price}`, productId];
            let i = localStorage.length + 1;
            // cas d'un article supprimé en milieu de numérotation
            while (localStorage[`article${i}`] !== undefined) { 
                i++;
            };
            //enregistrement local pour mise en panier
            localStorage.setItem(`article${i}`, `${articleToAdd}`); 
            alert('Nounours ajouté au panier');
            //mise à jour du compteur d'article dans le panier dans la nav bar
            this.dataManager.cartCounter();
        });
    };
}
new Product();