class ConfirmOrder{

    dataManager;
    response;
    
    constructor() {
        this.dataManager = new DataManager();
        //this.confirmOrder();
    }
    
    /**
     * récupère l'id de commande généré et construit la page de confirmation
     *
     * @param   {object}  formContent  formulaire de contact
     * @param   {Array}  cartContent  contenu du panier (id seulement)
     *
     * @return  {[type]}               [return description]
     */
    async confirmOrder(formContent, cartContent) {
        console.log("page confirm ");
        console.log(formContent, cartContent);
        this.response = await this.dataManager.postOrderRequest(formContent, cartContent);
        console.log(this.response)
        document.getElementsByTagName("h1")[0].innerText = "Félicitation " /*+ this.response.contact.firstName*/;
        
        for (let i=0;i=this.response.products.length;i++){  //déjà calculé sur autre page. Comment récupérer valeur d'autre script?
            console.log(i, this.response.products[i].price)
            console.log(i, recapTotal)
            recapTotal += this.response.products[i].price;
        }
        document.getElementById("totalPrice").innerText = recapTotal;
        
        document.getElementById("idNbr").innerText = this.response.orderId;
        
        //vide le panier
        localStorage.clear();

        //redirection sur page d'accueil pour acheter encore plus de nounours
       
        setTimeout(function(){ window.location='./index.html'; }, secondes * 1000);
        this.changeTimeValue();
        this.timer=setInterval(this.changeTimeValue, 1000);

    };   
         
     changeTimeValue(){
        if(secondes>1)
        {
            document.getElementById('compteur').innerHTML=secondes + ' secondes';
        }
         
        else if(secondes>=0)
        {
            document.getElementById('compteur').innerHTML=secondes + ' seconde';   
        }
         
        else
        {
            clearTimeout(timer);   
        }
        secondes--;
    }

}
recapTotal = 0;
secondes=100; // affecter 10 après debug
new ConfirmOrder();