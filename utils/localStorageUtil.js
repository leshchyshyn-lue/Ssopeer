class LocalStorageUtil {

    getProducts() {
        const productsLocalStorage = localStorage.getItem(PRODUCTS_KEY);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putProducts(id) {
        let products = this.getProducts();
        const user = this.getUser();
        if (products.length === 0) {
            const usersInMemory = this.getUsersInMemory();
            Object.values(usersInMemory).forEach(e => {
                if (e.id === user.id) {
                    products = e.products.slice(0);
                }
            });
        }
        let pushProduct = false;
        const index = products.indexOf(id);
        if (index === -1) {
            products.push(id);
            pushProduct = true;
        } else {
            products.splice(index, 1);
        }

        this.putUser(user.id, user.email, user.password, products);
        this.putProductsInUserInMemory(products);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        return { pushProduct, products }
    }

    getUser() {
        const userLocalStorage = localStorage.getItem(USER_KEY);
        if (userLocalStorage !== "") {
            return JSON.parse(userLocalStorage);
        }
        return "";
    }

    putUser(id, email, password, products) {
        const user = ({ id, email, password, products });
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
    }

    getUsersInMemory() {
        const userLocalStorage = localStorage.getItem(USERS_IN_MEMORY_KEY);
        if (userLocalStorage !== null) {
            return JSON.parse(userLocalStorage);
        }
        return USERS;
    }

    putUserInMemory(id, email, password, products) {
        let users = localStorageUtil.getUsersInMemory();
        users.push({ id, email, password, products });
        localStorage.setItem(USERS_IN_MEMORY_KEY, JSON.stringify(users));
        return users;
    }

    putProductsInUserInMemory(products) {
        let usersInMemory = localStorageUtil.getUsersInMemory();
        let newUsers = [];
        if (usersInMemory.length === 0) {
            newUsers = USERS.concat(usersInMemory);
        } else {
            newUsers = usersInMemory.slice(0);
        }
        const user = this.getUser();
        Object.values(newUsers).forEach(element => {
            if (user.id === element.id) {
                element.products.splice(0, element.products.length);
                element.products = products.slice(0);
                localStorage.setItem(USERS_IN_MEMORY_KEY, JSON.stringify(newUsers));
                return;
            }
        });
    }

    checkAuthorization() {
        if (localStorageUtil.getUser() === null) {
            return headerPage.notAuthorized();
        } else {
            return headerPage.isAuthorized();
        }
    }

    logOut() {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(PRODUCTS_KEY);
        window.location.replace("http://localhost:8848/index.html");
    }

}

const localStorageUtil = new LocalStorageUtil();


