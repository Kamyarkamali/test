import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const swiperProducts = new Swiper(".product-slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      320: {
        // برای موبایل
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        // برای تبلت
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        // برای دسکتاپ
        slidesPerView: 4.8,
        spaceBetween: 15,
      },
    },
  });
});
