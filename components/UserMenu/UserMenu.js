class UserMenu {

    onPressedTitle(selector) {
        const passBlock = document.querySelector('.user-menu__pass-block').style;
        const addEmailBlock = document.querySelector('.user-menu__addEmail').style;
        const passErrorMessage = document.getElementById('passFormErrorMessage').firstChild;
        const addEmailErrorMessage = document.getElementById('addEmailErrorMessage').firstChild;

        let block = document.querySelector(selector).style;
        let userMenu = document.querySelector('.user-menu').style;

        if (block.display === 'block') {
            block.display = 'none';
            userMenu.height = '26.2%';
        } else {
            block.display = 'block';
            userMenu.height = '40.2%';
        }

        if (passBlock.display === 'none') {
            this.some(passErrorMessage);
        }

        if (addEmailBlock.display === 'none') {
            this.some(addEmailErrorMessage);
        }
    }

    some(message) {
        if (message !== null) {
            message.remove();
        }
    }

    onSaveNewPassword() {
        const user = localStorageUtil.getUser();
        let form = document.getElementById('newPasswordForm');
        form.addEventListener('click', (e) => {

            const formData = new FormData(form);
            const oldPass = formData.get('oldPass');
            const newPass = formData.get('newPass');
            const reEnterPass = formData.get('reEnterPass');
            let errorMessage = '';
            const formId = 'passFormErrorMessage';
            const selector = '.user-menu';
            if (oldPass !== user.password) {
                e.preventDefault();
                errorMessage = 'Старий пароль не збігається';
                formsHelper.createErrorMessage(errorMessage, '42.8%', formId, selector);
            } else if (formsHelper.validatePassword(newPass) === false) {
                e.preventDefault();
                errorMessage = 'Пароль має містити 1 велику літеру та 8 символів';
                formsHelper.createErrorMessage(errorMessage, '45.2%', formId, selector);
            } else if (newPass !== reEnterPass) {
                e.preventDefault();
                errorMessage = 'Повторний пароль не збігається';
                formsHelper.createErrorMessage(errorMessage, '42.8%', formId, selector);
            } else {
                localStorageUtil.deleteUserInMemory(user);
                localStorageUtil.putUserInMemory(user.id, user.email, newPass, user.products);
                localStorageUtil.putUser(user.id, user.email, newPass, user.products);
            }

        }, { once: true });
    }

    onAddEmail() {
        const user = localStorageUtil.getUser();
        let form = document.getElementById('addEmailForm');

        form.addEventListener('click', (e) => {
            const formData = new FormData(form);
            const newEmail = formData.get('newEmail');
            let errorMessage = '';
            if (newEmail === user.email) {
                e.preventDefault();
                errorMessage = 'Вказаний ваш email';
                formsHelper.createErrorMessage(errorMessage, '42%', 'addEmailErrorMessage', '.user-menu')
            } else if (formsHelper.validateEmail(newEmail) === false) {
                e.preventDefault();
                errorMessage = 'Не валідний email';
                formsHelper.createErrorMessage(errorMessage, '42%', 'addEmailErrorMessage', '.user-menu')
            } else {
                localStorageUtil.putUser(user.id, user.email, user.password, user.products, newEmail);
                localStorageUtil.deleteUserInMemory(user);
                localStorageUtil.putUserInMemory(user.id, user.email, user.password, user.products, newEmail);
            }
        });
    }

    onDeleteAccount() {
        const user = localStorageUtil.getUser();
        localStorageUtil.deleteUserInMemory(user);
        localStorage.removeItem(USER_KEY);
        scrollController.handleClear(ROOT_USER_MENU);
        scrollController.handleClear(ROOT_CONFIRM_WINDOW);
        localStorage.removeItem(PRODUCTS_KEY);
        headerPage.rendler();
    }

    rendler() {
        scrollController.removeScroll();
        const html = `
            <div class="window">
                <div class="user-menu">
                <button class="approaching__close" onclick="scrollController.handleClear(ROOT_USER_MENU)">
                    <img src="img/close.png">
                </button>
                    <div class="container">
                        <div class="user-menu__row">
                            <div class="user-menu__title" onclick="userMenuPage.onPressedTitle('.user-menu__pass-block')">Змінити пароль</div>
                            <div id="passFormErrorMessage"></div>
                            <div class="user-menu__pass-block">
                                <form id="newPasswordForm">
                                    <div class="user-menu__data">
                                        <label for="oldPass">Старий пароль *</label>
                                        <input name="oldPass" id="oldPass" class="data__field user-menu__field" placeholder="Введіть старий пароль" type="password"/>
                                        <img class="user-menu__data_show" src="img/showpass.png" onclick="formsHelper.showPassword('oldPass')">
                                    </div>
                                    <div class="user-menu__data">
                                        <label for="newPass">Новий пароль *</label>
                                        <input name="newPass" id="newPass" class="data__field user-menu__field" placeholder="Введіть новий пароль" type="password"/>
                                        <img class="user-menu__data_show" src="img/showpass.png" onclick="formsHelper.showPassword('newPass')">
                                    </div> 
                                    <div class="user-menu__data">
                                        <label for="reEnterPass">Підтвердіть новий пароль *</label>
                                        <input name="reEnterPass" id="reEnterPass" class="data__field user-menu__field" placeholder="Повторіть новий пароль" type="password"/>
                                        <img class="user-menu__data_show" src="img/showpass.png" onclick="formsHelper.showPassword('reEnterPass')">
                                    </div>
                                    <button onclick="userMenuPage.onSaveNewPassword()" class="user-menu__button">Зберегти</button>
                                </form>
                            </div>
                            <div class="user-menu__title" onclick="userMenuPage.onPressedTitle('.user-menu__addEmail')">Додаткова пошта</div>
                            <div id="addEmailErrorMessage"></div>
                            <div class="user-menu__addEmail">
                                <form id="addEmailForm">
                                    <div class="user-menu__email-data">
                                        <label for="email">Email *</label>
                                        <input name="newEmail" id="email" class="data__field user-menu__field" type="email" placeholder="Введіть додаткову пошту"/>
                                        <button onclick="userMenuPage.onAddEmail()" class="user-menu__button">Зберегти</button>
                                    </div>
                                </form>                                    
                            </div>
                            <div class="user-menu__title" onclick="confirmWindowPage.rendler()">Видалити аккаунт</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        ROOT_USER_MENU.innerHTML = html;
    }
}

const userMenuPage = new UserMenu();