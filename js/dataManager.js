class DataManager {

    /**
     * l'adresse du serveur
     * @type {String|null}
     */
    src = null;

    /**
     * l'ensemble des produits
     * @type {Array|null}
     */
    products = null;

    constructor() {
        this.src = "http://localhost:3000/api/teddies/";
    }

    /**
     *permet de récupérer tous les produits
     *
     * @return  {Array}  tous les produits
     */
    async getAllProducts() {
        if (this.products === null) {
            this.products = await fetch(this.src);
            if (this.products.ok) {
                this.products = await this.products.json();
            } else {
                alert('Erreur : ' + this.products.status); //marche pas si serveur deco try catch?
            }
        }
        return this.products; //si liste présente mais pas à jour? combien de temps et ou les données restent?
    }

    /**
     * permet d'avoir les caractéristiques d'un produit
     *
     * @param   {String}  idProduct  id du produit dont on veut les caractériques
     *
     * @return  {Object}             les spécifications du produit
     */
    
     async getProductInfo(idProduct) {
        if (this.products !== null) {
            for (let i = 0; i < this.products.length; i++) {
                if (idProduct === this.products[i]._id) {
                    return this.products[i];
                };
            };
        }
        let productInfo = await fetch(this.src + idProduct);
        productInfo = await productInfo.json();
        if (this.products === null) this.products = [];
        this.products.push(productInfo);
        return productInfo;
    }

    /**
    * récupère les info formulaire, le panier et renvoi un numéro de commande
    * @param   {object}  contact  info contact du formulaire
    * @param   {array}  products  tableau d'id des produits commandés
    * @return  {Object}           info passées plus n° de commande
    * */

    async postOrderRequest(contact, products) {
        var orderConfirm = await fetch(this.src + 'order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({contact, products})
        });
        orderConfirm = await orderConfirm.json();
        return orderConfirm;
    }

    /**
     * affiche et met à jour le nombre d'article dans le panier dans la barre de navigation
     *
     */
    cartCounter() {
        document.querySelector('#cart').innerText = `Panier (${localStorage.length})`;
    }

    saveOrder(idOrder, orderInfo, total){
        sessionStorage.setItem(idOrder, JSON.stringify({...orderInfo, "total" : total}));
    }

    getOrder(id){
        return JSON.parse(sessionStorage.getItem(id));
    }


    /**
     * vide le stockage local après confirmation commande
     *
     */
    clearLocalData(){
        localStorage.clear();
        sessionStorage.clear();
    }
}