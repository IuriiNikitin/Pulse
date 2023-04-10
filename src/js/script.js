"use strict";

// Slider

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    nav: true,
    navPosition: "bottom",
    controls: false,
    responsive: {
        768: {
            nav: false,
        }
    }
  });

document.querySelector(".carousel__prev").addEventListener("click", () => {
    slider.goTo('prev');
  });

document.querySelector(".carousel__next").addEventListener("click", () => {
    slider.goTo('next');
  });

// Catalog

const catalog = document.querySelector(".catalog"),
catalogLinks = catalog.querySelectorAll(".catalog-item__link , .catalog-item__back"),
contentClass = "catalog-item__content",
listClass = "catalog-item__list";

catalogLinks.forEach(catalogLink => {
  catalogLink.addEventListener("click", (e) => {
    e.preventDefault();

    const content = e.target.parentNode.parentNode.querySelector("." + contentClass),
    list = e.target.parentNode.parentNode.querySelector("." + listClass);

    if(window.innerWidth >= 576) {
      content.classList.toggle(contentClass + "_active");
      list.classList.toggle(listClass + "_active");
    } else {
      console.log(list);
    }

  });
});

// CatalogTabs

const tabs = catalog.querySelectorAll(".catalog__tab");
const content = catalog.querySelectorAll(".catalog__content");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    for(let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("catalog__tab_active");
      content[j].classList.remove("catalog__content_active");
    }

    tabs[i].classList.add("catalog__tab_active");
    content[i].classList.add("catalog__content_active");

  });
});