class Product {

    constructor() {
        this.classNameActive = 'products__details_active';
        this.labelAdd = 'Добавити в корзину';
        this.labelRemove = 'Видалити з корзини';
    }

    handleSetLocationStorage(element, id) {
        if (localStorageUtil.getUser() === null) {
            loginPage.rendler();
        } else {
            const { pushProduct, products } = localStorageUtil.putProducts(id);

            if (pushProduct) {
                element.classList.add(this.classNameActive);
                element.innerHTML = this.labelRemove;
            } else {
                element.classList.remove(this.classNameActive);
                element.innerHTML = this.labelAdd;
            }
            headerPage.rendler();
        }
    }

    rendler() {
        let user = localStorageUtil.getUser();

        let hmtlCatalog = '';
        CATALOG.forEach(({ size, description, price, id, img }) => {
            let activeClass = '';
            let activeText = '';
            if (user !== null) {
                const userProducts = user.products;

                if (userProducts.indexOf(id) === -1) {
                    activeText = this.labelAdd;
                } else {
                    activeClass = ' ' + this.classNameActive;
                    activeText = this.labelRemove;
                }
            } else {
                activeText = this.labelAdd;
            }



            hmtlCatalog += `
                        <div class="products__product">
                            <div class="products__image">
                                <img src="${img}" alt="#">
                            </div>
                            <div class="products__details">
                                <div class="products__details_description">
                                    ${description}
                                </div>
                                <div class="products__details_sizes">
                                    ${size}
                                </div>
                                <div class="products__details_price">
                                    ${price}
                                </div>
                                 <button class="products__details_add${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}')">
                                 ${activeText}
                                 </button>
                            </div>
                        </div>
            `;
            ROOT_PRODUCTS.innerHTML = hmtlCatalog;
        })
    }
}

const productsPage = new Product;
productsPage.rendler();