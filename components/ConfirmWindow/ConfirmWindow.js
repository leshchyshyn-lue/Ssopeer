class ConfirmWindow {

    onCancel() {
        scrollController.handleClear(ROOT_CONFIRM_WINDOW);
        scrollController.removeScroll()
    }

    rendler() {
        const html = `
        <div class="window">
            <div class="confirm-window">
                <div class="confirm-window__title">Впевнені що хочете видалити аккаунт?</div>
                <div class="confirm-window__row">
                    <button onclick="userMenuPage.onDeleteAccount()">Так</button>
                    <button onclick="confirmWindowPage.onCancel()">Ні</button>
                </div>
            </div>
        </div>
    `;
        ROOT_CONFIRM_WINDOW.innerHTML = html;
    }
}

const confirmWindowPage = new ConfirmWindow();