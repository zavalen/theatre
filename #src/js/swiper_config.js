var swiper = new Swiper(".swiper-container", {
  effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  coverflowEffect: {
    rotate: 60,
    stretch: 10,
    depth: 200,
    modifier: 2,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



var swiper = new Swiper('#swiper-container2', {
  slidesPerView: 3,
  direction: getDirection(),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    }
  }
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
}