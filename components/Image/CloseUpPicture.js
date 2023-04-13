class CloseUpPicture {

    rendler(img) {
        scrollController.removeScroll();
        const html = `
            <div class="window">
                <div class="approaching">
                    <img src="${img}">
                </div>
                <button class="approaching__close"onclick="scrollController.handleClear(ROOT_IMAGE)">
                    <img src="img/close.png">
                </button>
            </div>
        `;
        ROOT_IMAGE.innerHTML = html;
    }
}

const closeUpPicturePage = new CloseUpPicture();
