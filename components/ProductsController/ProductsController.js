class ProductsController {

    handleSetLocationStorage(element, id) {
        if (localStorageUtil.getUser() === null) {
            loginPage.rendler();
        } else {
            const { pushProduct, products } = localStorageUtil.putProducts(id);

            if (pushProduct) {
                element.classList.add(CLASS_NAME_ACTIVE);
                element.innerHTML = LABEL_REMOVE;
            } else {
                element.classList.remove(CLASS_NAME_ACTIVE);
                element.innerHTML = LABEL_ADD;
            }
            headerPage.rendler();
        }
    }

    rendler(products) {

        let user = localStorageUtil.getUser();

        let hmtlCatalog = '';
        products.forEach(({ size, description, price, id, img }) => {
            let activeClass = '';
            let activeText = '';
            if (user !== null) {
                const userProducts = user.products;

                if (userProducts.indexOf(id) === -1) {
                    activeText = LABEL_ADD;
                } else {
                    activeClass = ' ' + CLASS_NAME_ACTIVE;
                    activeText = LABEL_REMOVE;
                }
            } else {
                activeText = LABEL_ADD;
            }

            hmtlCatalog += `
                        <div class="products__product">
                            <div class="products__image">
                                <button onClick="closeUpPicturePage.rendler('${img}')"><img src="${img}" alt="#"></button>
                            </div>
                            <div class="products__details">
                                <div class="products__details_description">
                                    ${description}
                                </div>
                                <div class="products__details_sizes">
                                    ${size}
                                </div>
                                <div class="products__details_price">
                                    ${price} грн.
                                </div>
                                 <button class="products__details_add${activeClass}" onclick="productsController.handleSetLocationStorage(this, '${id}')">
                                 ${activeText}
                                 </button>
                            </div>
                        </div>
            `;
            ROOT_PRODUCTS.innerHTML = hmtlCatalog;
        })
    }
}

const productsController = new ProductsController();
productsController.rendler(CATALOG)