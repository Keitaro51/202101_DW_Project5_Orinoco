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
            this.products = await this.products.json();
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
        let productInfo = await fetch(this.src+idProduct);
        productInfo     = await productInfo.json();
        if (this.products === null) this.products = [];
        this.products.push(productInfo);
        return productInfo;
    }
}