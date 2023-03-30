

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