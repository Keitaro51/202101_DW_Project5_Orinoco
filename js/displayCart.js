class Cart{

    /**
     * affiche le contenu du panier stocké localement
     *
     * @return  {Array}  id des produits du panier
     */
    displayCart() {
        console.log(localStorage);
    
        let boucle = localStorage.length+1;
        let cartId = [];
        for (let i = 1; i < boucle; i++) {
            //récupération des info article
            let item = localStorage.getItem(`article${i}`);
            //si article manquant dans liste (ex : art1, art2, null, art4)
            if(item === null){
                boucle++;
            }else{
                //info articles concaténées dans localStorage => split puis affectation
                let splitItem = item.split(",");
                let name = splitItem[0];
                let color = splitItem[1];
                let price = parseInt(splitItem[2]);
                let id = splitItem[3];
                total += price;
                document.querySelector('table').insertAdjacentHTML(
                    'beforeend',
                    `<tr id="article${i}">
                        <td>Ourson ${name} - Couleur : ${color}</td>
                        <td>${price}</td>
                        <td><img src="./img/trash.svg" id="${i}"></td>
                    </tr>`);
                cartId.push(id); //à envoyer au post fetch
            };
        };
        return cartId;
    };
}