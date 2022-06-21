const DOC = document;

// Menu
const menuOpener = DOC.getElementsByClassName('header__sm-menu__link')[0],
      menu       = DOC.getElementsByClassName('header__sm-menu__menu')[0],
      menuCloser = DOC.getElementsByClassName('header__sm-menu__menu-close')[0];

menuOpener.addEventListener('click', openMenu);
menuCloser.addEventListener('click', closeMenu);

function openMenu() {
    menu.style.right = '0';
};

function closeMenu() {
    menu.style.right = "-150vw";
};

// Scroll
const header = DOC.querySelector('.header'),
      portfolio = DOC.querySelector('.s-portfolio'),
      store = DOC.querySelector('.s-store');

const headerListener = DOC.querySelector('.scroll-1'),
      portfolioListener = DOC.querySelector('.scroll-2'),
      storeListener = DOC.querySelector('.scroll-3'),
      portfolioListenerLarge = DOC.querySelector('.l-portfolioScroll'),
      storeListenerLarge = DOC.querySelector('.l-storeScroll'),
      portfolioListenerSmall = DOC.querySelector('.s-portfolioScroll'),
      storeListenerSmall = DOC.querySelector('.s-storeScroll'),
      scrollCircle = DOC.getElementsByClassName('scrollCircle');

headerListener.addEventListener('click', function(){header.scrollIntoView()});
portfolioListener.addEventListener('click', function(){portfolio.scrollIntoView()});
portfolioListenerLarge.addEventListener('click', function(){portfolio.scrollIntoView()});
portfolioListenerSmall.addEventListener('click', function(){portfolio.scrollIntoView()});
storeListener.addEventListener('click', function(){store.scrollIntoView()});
storeListenerLarge.addEventListener('click', function(){store.scrollIntoView()});
storeListenerSmall.addEventListener('click', function(){store.scrollIntoView()});

DOC.addEventListener('scroll', scrollCheck);

function scrollCheck() {
    if (window.scrollY < portfolio.offsetTop - 5) {
        headerListener.style.color = '#fff';
        portfolioListener.style.color = '#FFFFFFCC';
        storeListener.style.color = '#FFFFFFCC';
        scrollCircle[0].classList.add('scrollActive');
        scrollCircle[1].classList.remove('scrollActive');
        scrollCircle[2].classList.remove('scrollActive');
        closeMenu();
    } if (window.scrollY > portfolio.offsetTop - 3) {
        portfolioListener.style.color = '#fff';
        headerListener.style.color = '#FFFFFFCC';
        storeListener.style.color = '#FFFFFFCC';
        scrollCircle[1].classList.add('scrollActive');
        scrollCircle[0].classList.remove('scrollActive');
        scrollCircle[2].classList.remove('scrollActive');
        closeMenu();
    } if (window.scrollY > store.offsetTop - 3) {
        storeListener.style.color = '#fff';
        headerListener.style.color = '#FFFFFFCC';
        portfolioListener.style.color = '#FFFFFFCC';
        scrollCircle[2].classList.add('scrollActive');
        scrollCircle[0].classList.remove('scrollActive');
        scrollCircle[1].classList.remove('scrollActive');
        closeMenu();
    };
};




// Portfolio
let portfolioFetch = DOC.getElementsByClassName('s-portfolio__items')[0];
let portfolioItems = [];

// Fetch
fetch("https://opensheet.elk.sh/1DD38vRc_7xAcEHXAt9fvxQLnfoDk6RooOyoG5t5Aocs/Instagram").then((res) => res.json()).then((data) => {
    data.forEach((row) => {
        portfolioItems.push(`<div class="cover"><div class="more"><div class="s-portfolio__items__item">${row.Embed} <div class="s-portfolio__items__item-link loading"><div class="s-portfolio__items__item-link__text"><a target="_blank" rel="noopener noreferrer" href="${row.Link}"><i class="fab fa-instagram"></i></a></div></div></div></div>`);
    });

    initialPortfolio();
});


const loadMorePortfolio = DOC.querySelector('.portfolio-button');
let currentPortfolioItems = 0;

// Initializing portfolio
function initialPortfolio() {
    // Initializing
    for(i=0; i<=7; i++) {
        portfolioFetch.innerHTML += portfolioItems[i];
        currentPortfolioItems += 1;
    };

    // Loading effect
    for (let i=0; i<=DOC.getElementsByClassName('s-portfolio__items__item-link__text').length; i++) {
        DOC.getElementsByClassName("s-portfolio__items__item-link")[i].classList.add('loading');
        DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "none";
    };
};



// Load more items to portfolio
loadMorePortfolio.addEventListener('click', (e) => {
    // Adding more
    for (let i = currentPortfolioItems; i < currentPortfolioItems + 4; i++) {
        if(portfolioItems[i] != undefined) {
            portfolioFetch.innerHTML += portfolioItems[i];
        };
    };
    currentPortfolioItems += 4;
    window.instgrm.Embeds.process();
    
    // Load more button will be hidden after list fully loaded
    if (portfolioFetch.childElementCount == portfolioItems.length || portfolioFetch.childElementCount > portfolioItems.length) {
        loadMorePortfolio.style.display = 'none';
    };

    // Calling load effect
    loading(true);
});



// Loading animation
function loading(more) {
    // Checking when finish
    finish(more);

    // Loading effect
    for (let i=0; i<=DOC.getElementsByClassName('s-portfolio__items__item-link__text').length; i++) {
        DOC.getElementsByClassName("s-portfolio__items__item-link")[i].classList.add('loading');
        DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "none";
    };
};

// Finish loading effect
function finish(more) {
    if(more) {
        let checkImage = setInterval(a, 1000);
        function a() {
            if(DOC.getElementsByClassName("instagram-media")[DOC.getElementsByClassName("instagram-media").length-1].hasAttribute('data-instgrm-payload-id')){
                for (let i=0; i<=DOC.getElementsByClassName("instagram-media").length-1; i++) {
                    if(DOC.getElementsByClassName("instagram-media")[i].style.backgroundColor == "white"){
                        DOC.getElementsByClassName("s-portfolio__items__item-link")[i].classList.remove('loading');
                        DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "block";
                    };
                };

                clearInterval(checkImage);
            };
        };
    };
};


// window.onload = function() {
//     // Finish initial portfolio loading
//     function finishLoading() {
//         for (let i=0; i<=DOC.getElementsByClassName("instagram-media").length; i++) {
//             if(DOC.getElementsByClassName("instagram-media")[i].style.backgroundColor == "white"){
//                 DOC.getElementsByClassName("s-portfolio__items__item-link")[i].classList.remove('loading');
//                 DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "block";
//             };
//         };
//     }; finishLoading();
// };



// Store
let storeFetch = DOC.getElementsByClassName('s-store__items')[0];
let storeItems = [];

// Fetch
fetch("https://opensheet.elk.sh/1DD38vRc_7xAcEHXAt9fvxQLnfoDk6RooOyoG5t5Aocs/Marketplace").then((res) => res.json()).then((data) => {
    data.forEach((row) => {
        storeItems.push(`<div class="s-store__items__item"> <div class="s-store__items__item-photo-container"> <div class="cover--store"><div class="more--store"><div class="s-store__items__item--photo">${row.Image} <div class="s-store__items__item-link loading"></div></div></div> </div><div class="s-store__items__item-info"> <h3>${row.Title}</h3> <p>${row.Description}</p><div class="s-store__items__item-info__bottom"> <h2>${row.Price}</h2> <a href="${row.Link}"><i class="fas fa-chevron-right"></i></a> </div></div></div>`);
    });

    initialStore();
});

const loadMoreStore = DOC.querySelector('.store-button');
let currentStoreItems = 0;

// Initializing store
function initialStore() {
    // Initializing
    for(i=0; i<=7; i++) {
        storeFetch.innerHTML += storeItems[i];
        currentStoreItems += 1;
    };

    // Loading effect
    for (let i=0; i<=DOC.getElementsByClassName('s-store__items__item-link__text').length; i++) {
        DOC.getElementsByClassName("s-store__items__item-link")[i].classList.add('loading');
        // DOC.getElementsByClassName('s-store__items__item-link__text')[i].style.display = "none";
    };
};


// Load more items to portfolio
loadMoreStore.addEventListener('click', (e) => {
    // Adding more
    for (let i = currentStoreItems; i < currentStoreItems + 4; i++) {
        if(storeItems[i] != undefined) {
            storeFetch.innerHTML += storeItems[i];
        };
    };
    currentStoreItems += 4;
    window.instgrm.Embeds.process();
    
    // Load more button will be hidden after list fully loaded
    if (storeFetch.childElementCount == storeItems.length || storeFetch.childElementCount > storeItems.length) {
        loadMoreStore.style.display = 'none';
    };

    // Calling load effect
    loadingStore(true);
});



// Loading animation
function loadingStore(more) {
    // Checking when finish
    finishStoreLoading(more);

    // Loading effect
    for (let i=0; i<=DOC.getElementsByClassName('s-store__items__item-link__text').length; i++) {
        DOC.getElementsByClassName("s-store__items__item-link")[i].classList.add('loading');
        // DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "none";
    };
};

// Finish loading effect
function finishStoreLoading(more) {
    if(more) {
        let checkImage = setInterval(a, 1000);
        function a() {
            if(DOC.getElementsByClassName("instagram-media")[DOC.getElementsByClassName("instagram-media").length-1].hasAttribute('data-instgrm-payload-id')){
                for (let i=0; i<=DOC.getElementsByClassName("instagram-media").length-1; i++) {
                    if(DOC.getElementsByClassName("instagram-media")[i].style.backgroundColor == "white"){
                        DOC.getElementsByClassName("s-store__items__item-link")[i].classList.remove('loading');
                        // DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "block";
                    };
                };

                clearInterval(checkImage);
            };
        };
    };
};


window.onload = function() {
    // Finish initial portfolio loading
    function finishLoading() {
        for (let i=0; i<=DOC.getElementsByClassName("instagram-media").length; i++) {
            if(DOC.getElementsByClassName("instagram-media")[i].style.backgroundColor == "white"){

                DOC.getElementsByClassName("s-portfolio__items__item-link")[i].classList.remove('loading');
                DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "block";

                DOC.getElementsByClassName("s-store__items__item-link")[i].classList.remove('loading');
                // DOC.getElementsByClassName('s-portfolio__items__item-link__text')[i].style.display = "block";
            };
        };
    }; finishLoading();
};

// Remake loading new items in Store section
// Check if items are loading