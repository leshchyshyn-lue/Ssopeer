class Shopping {

    clearOneElement(element, id) {
        productsController.handleSetLocationStorage(element, id);
        productsController.rendler(CATALOG);
        this.rendler();
    }

    rendler() {
        scrollController.removeScroll();
        const productStore = localStorageUtil.getUser().products;
        const title = `
            <div class="bucket__title">Кошик</div>
        `;
        if (productStore.length === 0) {
            let emptyBucket = `
                <div class="bucket-back">
                    <div class="bucket">
                        ${title}
                        <div class="bucket__emty">Ваш кошик порожній</div>
                        <button onclick="scrollController.handleClear(ROOT_SHOPPING)">
                            <img src="img/close.png">
                        </button>
                    </div>
                </div>
            `;
            ROOT_SHOPPING.innerHTML = emptyBucket;
        } else {

            let hmtlCatalog = '';
            let sumCatalog = 0;

            CATALOG.forEach(({ size, description, price, id }) => {
                if (productStore.indexOf(id) !== -1) {
                    hmtlCatalog += `
                        <div class="bucket__row">
                            <div class="bucket__element">
                                <div class="bucket__description">${description}</div>
                                <div class="bucket__size">${size}</div>
                                <div class="bucket__price">
                                    <div>${price} грн.</div>
                                    <div class="bucket__order" onclick="orderPage.handleOrder('${size}', '${id}', '${description}', '${price}')">  
                                    <button>Оформити замовлення</button>
                                    </div>
                                </div>
                            </div>
                            <button class="bucket__close" onclick="shoppingPage.clearOneElement(this, '${id}')">
                                <img src="img/close.png">
                            </button>
                        </div>
                `;
                    sumCatalog += price;
                }
            });
            let html = `
                <div class="bucket-back">
                    <div class="bucket">
                        ${title}
                        <div class="container">
                        ${hmtlCatalog}
                        <div class="bucket__sum">Сумма: ${sumCatalog} грн.</div>
                        </div>
                        <button onclick="scrollController.handleClear(ROOT_SHOPPING)">
                            <img src="img/close.png">
                        </button>
                    </div>
                </div>
            `;
            ROOT_SHOPPING.innerHTML = html;
        }
    }
}

const shoppingPage = new Shopping();

