class Login {

    onLogin() {
        let form = document.getElementById('loginForm');
        form.addEventListener('submit', () => {
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            const usersInMemory = localStorageUtil.getUsersInMemory();

            Object.values(usersInMemory).forEach(element => {
                if (element.email === email && element.password === password) {
                    localStorageUtil.putUser(element.id, element.email, element.password, Object.values(element.products));
                }
            });
        });
    }

    rendler() {
        scrollController.handleClear(ROOT_REGISTRATION);
        scrollController.removeScroll();
        const html = `
            <div class="login window">
                <div class="login__enter">
                    <div class="window__desc">
                        <div class="window__title">Авторизація</div>
                        <button onclick="scrollController.handleClear(ROOT_LOGIN)">
                            <img src="img/close.png">
                        </button>
                    </div>
                    <form id="loginForm">
                        <div class="data">
                            <div class="data__row">
                                <label id="email">Логін *</label>
                                <div></div>
                            </div>
                            <input class="data__field" type="email" name="email" placeholder="Введіть ваш email">
                            <div class="data__row">
                                <label id ="password">Пароль *</label>
                                <a>Забули пароль?</a>
                            </div>
                                <input class="data__field" type="password" name="password" placeholder="Введіть ваш пароль">
                                <div class="data__buttons">
                                    <button type="submit" onclick="loginPage.onLogin()">Увійти</button>
                                    <a onclick="registrationPage.rendler()">Реєстрація</a>
                                </div>                           
                        </div>               
                    </form>
                </div>
            </div>
        `;
        ROOT_LOGIN.innerHTML = html;
    }
}

const loginPage = new Login();
