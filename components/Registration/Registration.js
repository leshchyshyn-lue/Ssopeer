class Registration {

    onRegistration() {
        let form = document.getElementById('registrationForm');
        form.addEventListener('submit', () => {
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            let id = localStorageUtil.getUsersInMemory().length + 1;
            if (this.checkUserInMemory(email) === false) {

                localStorageUtil.putUserInMemory(id, email, password, []);
                localStorageUtil.putUser(id, email, password, []);
                alert("good")
            } else {
                alert("Exists in")
            }
        });
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
                    <form id ="registrationForm">
                        <div class="data">
                            <div class="data__row">
                                <label id="email">Логін *</label>
                                <div></div>
                            </div>
                            <input class="data__field" name="email" type="email" placeholder="Введіть ваш email">
                            <div class="data__row">
                                <label id ="password">Пароль *</label>
                            </div>
                                <input class="data__field" name="password" type="password" placeholder="Введіть ваш пароль">
                                <div class="data__buttons">
                                    <button type="submit" onclick="registrationPage.onRegistration()">Реєстрація</button>
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