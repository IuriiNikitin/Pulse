"use strict";
import catalogItemsData from "./catalog-items-data.js";

function fadeIn(element, callback) {
  const elementClass = element.classList[0];
  element.classList.add(elementClass + "_active","animate__animated", "animate__fadeIn");
  element.onanimationend = (e) => {
    if (e.animationName === "fadeIn") {
      element.classList.remove("animate__fadeIn");
      if(callback) {callback();}
    }
  }
  element.classList.remove("animate__fadeOut");
};

function fadeOut(element, callback) {
  const elementClass = element.classList[0];
  element.classList.remove("animate__fadeIn");
  element.classList.add("animate__fadeOut");
  element.onanimationend = (e) => {
    if (e.animationName === "fadeOut") {
      element.classList.remove(elementClass + "_active");
      element.classList.remove("animate__fadeOut");
      if(callback) {callback();}
    }
  };
};

// CatalogRender

const catalogContent = document.querySelectorAll(".catalog__content");

catalogContent.forEach(content => {

  const data = catalogItemsData.filter(item => item.purpose === content.dataset.purpose);

  data.forEach(item => {

    let list = "<ul>"
    item.list.forEach(listItem => {
      list += `<li>${listItem}</li>`;
    });
    list += `</ul><a href="#" class="catalog-item__back">НАЗАД</a>`;

    const formatedPrice = new Intl.NumberFormat("ru").format(item.price);
    const formatedOldPrice = new Intl.NumberFormat("ru").format(item.oldPrice);
    
    const catalogItem = `
    <div class="catalog-item">
      <div class="catalog-item__wrapper">
          <div class="catalog-item__content catalog-item__content_active">
              <img src=${item.img} alt="item_img" class="catalog-item__img">
              <div class="catalog-item__title">${item.name} <br> ${item.model}</div>
              <div class="catalog-item__subtitle">${item.subtitle}</div>
              <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a>
          </div>
          <div class="catalog-item__list">
            ${list}
          </div>
      </div>
      <hr>
      <div class="catalog-item__footer">
          <div class="catalog-item__prices">
              <div class="catalog-item__old-price">${formatedOldPrice} руб.</div>
              <div class="catalog-item__price">${formatedPrice} руб.</div>
          </div>
          <button class="button button_mini" data-modal="order">КУПИТЬ</button>
      </div>
    </div>`;

    content.innerHTML += catalogItem;
  });
});



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
catalogItem = catalog.querySelectorAll(".catalog-item"),
catalogLinks = catalog.querySelectorAll(".catalog-item__link , .catalog-item__back"),
contentClass = "catalog-item__content",
listClass = "catalog-item__list";

catalogLinks.forEach((catalogLink , i) => {
  catalogLink.addEventListener("click", (e) => {
    e.preventDefault();

    const content = catalogItem[Math.trunc(i / 2)].querySelector("." + contentClass),
    list = catalogItem[Math.trunc(i / 2)].querySelector("." + listClass);

    if(window.innerWidth >= 576) {
      content.classList.toggle(contentClass + "_active");
      list.classList.toggle(listClass + "_active");
    } else {
      const modal = overlay.querySelector("#about");
      const title = content.querySelector(".catalog-item__title").textContent;
      const subtitle = content.querySelector(".catalog-item__subtitle").textContent;
      const src = content.querySelector("img").src;
      const ul = list.querySelector("ul").innerHTML;

      modal.querySelector(".modal__subtitle").innerText = title;
      modal.querySelector("img").src = src;
      modal.querySelector(".modal__descr").innerText = subtitle;
      modal.querySelector("ul").innerHTML = ul;

      fadeIn(overlay);
      fadeIn(modal);
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


//Modals

const overlay = document.querySelector(".overlay");
const modals = overlay.querySelectorAll(".modal");
const consultBtns = document.querySelectorAll("[data-modal=consultation]");
const orderBtns = document.querySelectorAll("[data-modal=order]");

consultBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = overlay.querySelector("#consultation");
    fadeIn(overlay);
    fadeIn(modal);
  });
});

orderBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const modal = overlay.querySelector("#order");
    const title = catalogItem[i].querySelector(".catalog-item__title").textContent;
    modal.querySelector(".modal__descr").innerText = title;
    fadeIn(overlay);
    fadeIn(modal);
  });
});

modals.forEach(modal => {
  const close = modal.querySelector(".modal__close");
  close.addEventListener("click", () => {
    fadeOut(overlay);
    fadeOut(modal);
  });
});

//FormValidation

const formHandle = document.querySelectorAll('form');

const validatorOptions = {
  locale:"ru",
  autoHideErrors: true,
  messages: {
    ru: {
      name: {
        empty: "Это обязательное поле",
        incorrect: "Неправильное имя",
      },
      phone: {
        empty: "Это обязательное поле",
        incorrect: "Неправильный номер телефона",
      },
      email: {
        empty: "Это обязательное поле",
        incorrect: "Неправильный E-mail",
      },
      minlength: {
        incorrect: "Слишком короткий номер телефона"
      },
      required: {
        empty: "Это обязательное поле",
      },
    },
  },
};

formHandle.forEach(form => {
  new Validator(form, function (err, res) {
    if(res) {
      submitData(form);
      return false;
    }
    return res;
}, validatorOptions);
});


//InputMask

document.querySelectorAll("input[name=phone]").forEach(inputPhone => {
  const phoneMask = IMask(
    inputPhone, {
      mask: '+{7}(000)000-00-00'
    });
});


//upButton

const pageUp = document.querySelector(".pageup");


window.addEventListener("scroll", () => {
  if(window.pageYOffset > 1600) {
    if(getComputedStyle(pageUp).display === "none") {
      fadeIn(pageUp);
    }
  } else {
    fadeOut(pageUp);
  }
});


//wow

new WOW().init();


// Submit

function submitData(form) {
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData.entries());


  // some code to push data to server
  console.log(obj);

  const thanks = overlay.querySelector("#thanks");
  const isModal = form.parentNode.classList.contains("modal");


 
  if(isModal) {
    fadeOut(form.parentNode, () => {
      form.reset();
      fadeIn(thanks);
    });
  } else {
    fadeIn(overlay);
    fadeIn(thanks, () => {
      form.reset();
    });
  }


 
}