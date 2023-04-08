class Header {

    isAuthorized() {
        const productsCounter = localStorageUtil.getUser().products.length;
        const html = `
        <div class="header__menu">
            <a class="header__menu_item" onclick="shoppingPage.rendler()"><img src="img/basket.png" alt="#"></a>
            <div class="header__menu_counter">${productsCounter}</div>
            <a onclick="" class="header__menu_item"><img src="img/user.png" alt="#"></a>
            <a onclick="localStorageUtil.logOut()" class="header__menu_item"><img src="img/exit.png" alt="#"></a>
        </div> 
        `;
        return html;
    }

    notAuthorized() {
        const html = `
            <div class="header__access">
                <a onclick="loginPage.rendler()" class="header__access_link">Увійти</a>
                <a onclick="registrationPage.rendler()" class="header__access_link">Зареєструватись</a>
            </div>
            
        `;
        return html;
    }

    rendler() {
        const check = localStorageUtil.checkAuthorization();
        const html = `
                    <div class="header__navigator">
                        <a href="http://localhost:8848/index.html" class="header__logo">
                            <img src="img/logo.png" alt="#">
                        </a>
                        <button class="header__search">
                            <img src="img/search.png" alt="">
                        </button>
                    </div>
                    <div class="header__discounts">Some discounts must be here!111</div>
                    ${check}
        `;
        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();
headerPage.rendler();


