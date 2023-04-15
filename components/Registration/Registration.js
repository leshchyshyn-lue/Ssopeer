class Registration {

    onRegistration() {
        let form = document.getElementById('registrationForm');
        form.addEventListener('click', (e) => {
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            let id = localStorageUtil.getUsersInMemory().length + 1;
            let errorMessage = '';
            let height = "305px";
            const formId = 'registrationForm';
            const selector = '.login__enter';
            if (formsHelper.validateEmail(email) === false) {
                e.preventDefault();
                errorMessage = "Не валідний email";
                formsHelper.createErrorMessage(errorMessage, height, formId, selector);
            } else if (formsHelper.validatePassword(password) === false) {
                e.preventDefault();
                errorMessage = "Пароль має містити 1 велику літеру та 8 символів";
                height = "325px"
                formsHelper.createErrorMessage(errorMessage, height, formId, selector);
            } else if (this.checkUserInMemory(email) === true) {
                e.preventDefault();
                errorMessage = "Цей email вже зайнятий";
                formsHelper.createErrorMessage(errorMessage, height, formId, selector);
            } else {
                localStorageUtil.putUserInMemory(id, email, password, [], '');
                localStorageUtil.putUser(id, email, password, [], '');
            }

        }, { once: true });
    }

    checkUserInMemory(email) {
        const isInMemory = localStorage.getItem(USERS_IN_MEMORY_KEY);
        if (isInMemory === null) {
            return false;
        }
        const index = isInMemory.indexOf(email);
        if (index === -1) {
            return false;
        }
        return true;
    }

    rendler() {
        scrollController.handleClear(ROOT_LOGIN);
        scrollController.removeScroll();
        const html = `
        <div class="login window">
                <div class="login__enter">
                    <div class="window__desc">
                        <div class="window__title">Реєстрація</div>
                        <button onclick="scrollController.handleClear(ROOT_REGISTRATION)">
                            <img src="img/close.png">
                        </button>
                    </div>
                    <form id ="registrationForm" >
                        <div class="data">
                            <div class="data__row">
                                <label for="email">Логін *</label>
                                <div></div>
                            </div>
                            <input id="email" class="data__field" name="email" type="email" placeholder="Введіть ваш email">
                            <div class="data__row">
                                <label for="password">Пароль *</label>
                            </div>
                            <div class="data__pass-row">
                                <input id="pass" class="data__field" type="password" name="password" placeholder="Введіть ваш пароль">
                                <img src="img/showpass.png" onclick="formsHelper.showPassword('pass')">
                            </div>
                            <div class="data__buttons">
                                    <button onclick="registrationPage.onRegistration()">Реєстрація</button>
                                    <a onclick="loginPage.rendler()">Увійти</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        ROOT_REGISTRATION.innerHTML = html;
    }
}

const registrationPage = new Registration();