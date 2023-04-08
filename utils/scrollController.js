class ScrollController {

    handleClear(root) {
        root.innerHTML = '';
        document.querySelector('HTML').style.overflow = 'auto';
    }

    removeScroll() {
        document.querySelector('HTML').style.overflow = 'hidden';
    }
}

const scrollController = new ScrollController();