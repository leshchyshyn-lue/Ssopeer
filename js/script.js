let openSearch = document.querySelector(".header__search");
let closeSearch = document.querySelector(".close-search");
let body = document.querySelector("BODY")
let modalWindow = document.querySelector(".modal-window");
let wrapper = document.querySelector(".wrapper");

let searchForm = document.forms.searchForm;
let searchInput = searchForm.searchInput;


openSearch.addEventListener('click', () => {
    modalWindow.style.display = 'flex';
    wrapper.style.opacity = '0.4';
    body.style.background = 'black';
});

closeSearch.addEventListener('click', () => {
    modalWindow.style.display = 'none';
    wrapper.style.opacity = '10';
    body.style.background = 'white';
});





