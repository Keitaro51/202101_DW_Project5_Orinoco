class PageManager{
    constructor(domTarget){
        this.DOM = domTarget;
        this.showPage(window.location.search.slice(1));
    }


    definePage(currentPage){
        console.log("currentPage",currentPage, currentPage.slice(0,7))
        if(currentPage === "") return new ProductList();
        // if(currentPage === "confirm") return new ProductList();
        if (currentPage.slice(0,8) === "product_") return new ProductSelected(currentPage.slice(8));
    }

    async showPage(currentPage){
        this.page = this.definePage(currentPage);
        console.log(currentPage, this.page)
        this.DOM.innerHTML = await this.page.html();
    }

    changePage(newPage){
        console.log("newPage", newPage)
        this.showPage(newPage);
    }
}