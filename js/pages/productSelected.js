class ProductSelected{

        colorChosen;
        teddy;
    
        constructor(id) {
            this.productId = id
        }
    
        /**
         * retrieve product id in url, display article and watch for color choice and add to cart btn
         */
        async html() {
            //retrieve product info from id
            this.teddy = await dataManager.getProductInfo(this.productId);
            //enregistre la valeur sélectionnée par défaut au lancement de la page
            this.colorChosen = this.teddy.colors[0]; 
            
            return `<h1>Bonjour, je suis ${this.teddy.name.split(' ')[0]}. Tu veux être mon ami?</h1>`;
            document.getElementsByTagName('h1')[0].textContent=`Bonjour, je suis ${this.teddy.name.split(' ')[0]}. Tu veux être mon ami?`;
            document.querySelector('.card-img-top').setAttribute(`src`, `${this.teddy.imageUrl}`)
            document.getElementsByTagName('h2')[0].textContent = `${this.teddy.name}`;
            document.querySelectorAll('p')[0].textContent =`${this.teddy.description}`;
            document.querySelectorAll('p')[1].textContent =`Prix : ${this.teddy.price} Doudoullars`;
    
            // this.dataManager.cartCounter();
    
            //display all avaible colors in select element
            for (let color of this.teddy.colors) {
                document.getElementById('custon-config').insertAdjacentHTML(
                    'beforeend',
                    `<option value="${color}">${color}</option>`);
            };
    
            this.colorChoice();
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