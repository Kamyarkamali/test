import { data } from "../data/localData.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
document.addEventListener("DOMContentLoaded", () => {
  let toggelMenu = document.querySelector(".toggelMenu");

  if (!toggelMenu) return;

  // استفاده از grid به صورت کلی برای منو
  let menuItems = data
    .map(
      (item, index) => `
      <a href="${
        item.href
      }" class="menu-item px-6 py-4 text-[#909090] text-center rounded-lg transition-all duration-300 ${
        index === 0 ? "default-bg" : ""
      } hover:bg-gray-200">
        <p class="font-bold text-lg text-black">${item.titlePersin}</p>
        <p class="text-gray-500 text-sm font-english">${item.titleEnglish}</p>
      </a>
    `
    )
    .join("");

  // تغییرات در منو برای قرار دادن در قالب grid
  toggelMenu.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 text-[#909090]">
      ${menuItems}
    </div>
  `;

  // افزودن رویداد کلیک برای تغییر پس‌زمینه
  let menuLinks = toggelMenu.querySelectorAll(".menu-item");

  // تصویر پیش‌فرض برای اولین آیتم
  let defaultImage = "../images/local/bgmegamenu.png"; // تصویر پیش‌فرض
  menuLinks[0].style.backgroundImage = `url(${defaultImage})`;
  menuLinks[0].style.backgroundSize = "contain";
  menuLinks[0].style.backgroundPosition = "center";
  menuLinks[0].style.backgroundRepeat = "no-repeat";

  menuLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // جلوگیری از هدایت به لینک

      // پاک کردن تصویر پس‌زمینه تمامی آیتم‌ها
      menuLinks.forEach((link) => {
        link.style.backgroundImage = ""; // پاک کردن پس‌زمینه
      });

      // افزودن تصویر پس‌زمینه فقط برای آیتم کلیک شده
      let selectedImage = data[index].image || defaultImage; // تصویر مربوط به آیتم یا تصویر پیش‌فرض

      link.style.backgroundImage = `url(${selectedImage})`;
      link.style.backgroundSize = "contain"; // کاهش سایز تصویر
      link.style.backgroundPosition = "center";
      link.style.backgroundRepeat = "no-repeat";
    });
  });
});

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

  on: {
    slideChange: function () {
      document.querySelectorAll(".swiper-slide").forEach((slide) => {
        slide.classList.remove("active");
      });

      const activeSlide = this.slides[this.activeIndex];
      activeSlide.classList.add("active");
    },
  },
});
