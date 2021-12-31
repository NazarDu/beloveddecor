const DOC = document;

const menuOpener = DOC.getElementsByClassName('header__sm-menu__link')[0],
      menu       = DOC.getElementsByClassName('header__sm-menu__menu')[0],
      menuCloser = DOC.getElementsByClassName('header__sm-menu__menu-close')[0];

menu.style.display = "none";

menuOpener.addEventListener('click', openMenu);
menuCloser.addEventListener('click', closeMenu);

function openMenu() {
    menu.style.display = "flex";
};

function closeMenu() {
    menu.style.display = "none";
};