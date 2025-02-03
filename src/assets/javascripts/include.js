import { data, megaMenuData } from "../data/localData.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.mjs";

// تابع واحد برای بارگذاری کامپوننت‌ها
function loadComponent(id, file, callback = null) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

// گرفتن فایل‌های هدر و فوتر نمایش آن‌ها در تمام صفحات
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("Header", "../layout/Header.html", function () {
    let imageTopHeader = document.querySelector(".topheader");
    setTimeout(function () {
      imageTopHeader.style.display = "none";
    }, 2000);

    let menuUl = document.querySelector(".megamenuUl");
    let listmegamenu = document.querySelector(".listmegamenu");

    let pointer = document.querySelector(".pointer");
    let bufferZone = document.querySelector(".buffer-zone");
    let megammenu = document.querySelector(".megammenu");

    // مدیریت همبرگر منو
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (hamburgerMenu && mobileMenu && closeMenu) {
      // باز کردن منوی کشویی
      hamburgerMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("block");
      });

      // بستن منوی کشویی
      closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("block");
        mobileMenu.classList.add("hidden");
      });

      // بستن منوی کشویی وقتی کاربر خارج می‌شود
      document.addEventListener("click", function (event) {
        if (
          !mobileMenu.contains(event.target) &&
          !hamburgerMenu.contains(event.target)
        ) {
          mobileMenu.classList.remove("block");
          mobileMenu.classList.add("hidden");
        }
      });
    } else {
      console.error("عناصر همبرگر منو یافت نشدند!");
    }

    if (pointer && bufferZone && megammenu) {
      // باز کردن مگامنو با هاور روی pointer یا buffer zone
      pointer.addEventListener("mouseenter", function () {
        megammenu.classList.remove("hidden", "opacity-0");
        megammenu.classList.add(
          "opacity-100",
          "visible",
          "transition-all",
          "duration-300"
        );
      });

      const isAuthPage =
        window.location.pathname.includes("SignIn") ||
        window.location.pathname.includes("SingUp") ||
        window.location.pathname.includes("PanelUser") ||
        window.location.pathname.includes("About") ||
        window.location.pathname.includes("404");

      if (!isAuthPage) {
        // مقداردهی اولیه اسلایدر فقط اگر صفحه SignIn نباشد
        const swiper = new Swiper(".swiper-container", {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          autoplay: {
            delay: 3000,
          },
        });
      } else {
        // مخفی کردن اسلایدر در صفحه SignIn
        let swiperContainer = document.querySelector(".swiper-container");
        if (swiperContainer) {
          swiperContainer.style.display = "none";
        }
      }

      // اسلایدر هیرو
      // const swiper = new Swiper(".swiper-container", {
      //   slidesPerView: 1,
      //   spaceBetween: 10,
      //   loop: true,
      //   autoplay: {
      //     delay: 3000,
      //   },
      // });
      // اسلایدر هیرو

      bufferZone.addEventListener("mouseenter", function () {
        megammenu.classList.remove("hidden", "opacity-0");
        megammenu.classList.add(
          "opacity-100",
          "visible",
          "transition-all",
          "duration-300"
        );
      });

      // بستن مگامنو وقتی موس از pointer یا buffer zone خارج می‌شود
      pointer.addEventListener("mouseleave", function () {
        setTimeout(() => {
          if (!megammenu.matches(":hover") && !bufferZone.matches(":hover")) {
            megammenu.classList.remove("opacity-100", "visible");
            megammenu.classList.add(
              "opacity-0",
              "hidden",
              "transition-all",
              "duration-300"
            );
          }
        }, 10); // تأخیر کوچک برای بررسی موقعیت موس
      });

      bufferZone.addEventListener("mouseleave", function () {
        setTimeout(() => {
          if (!megammenu.matches(":hover") && !pointer.matches(":hover")) {
            megammenu.classList.remove("opacity-100", "visible");
            megammenu.classList.add(
              "opacity-0",
              "hidden",
              "transition-all",
              "duration-300"
            );
          }
        }, 10); // تأخیر کوچک برای بررسی موقعیت موس
      });

      // نگه داشتن مگامنو باز وقتی موس روی آن است
      megammenu.addEventListener("mouseenter", function () {
        megammenu.classList.remove("hidden", "opacity-0");
        megammenu.classList.add(
          "opacity-100",
          "visible",
          "transition-all",
          "duration-300"
        );
      });

      // بستن مگامنو وقتی موس از آن خارج می‌شود
      megammenu.addEventListener("mouseleave", function () {
        setTimeout(() => {
          if (!pointer.matches(":hover") && !bufferZone.matches(":hover")) {
            megammenu.classList.remove("opacity-100", "visible");
            megammenu.classList.add(
              "opacity-0",
              "hidden",
              "transition-all",
              "duration-300"
            );
          }
        }, 10); // تأخیر کوچک برای بررسی موقعیت موس
      });
    } else {
      console.error("عنصر pointer، buffer zone یا megammenu یافت نشد!");
    }

    // ایجاد منوهای اصلی
    megaMenuData.forEach((item) => {
      let createTageLi = document.createElement("li");
      let createTageA = document.createElement("a");
      let createIcon = document.createElement("img");
      createIcon.src = "../images/local/bgmegamenu.png";

      createTageA.href = item.href;
      createTageA.textContent = item.title;
      createTageA.classList.add("text-black");

      createTageLi.classList.add(
        "pt-2",
        "pb-4",
        "flex",
        "items-center",
        "gap-3"
      );

      if (item.icon) {
        createIcon.src = item.icon;
        createIcon.classList.add("w-[8px]", "h-[11px]");

        // تغییر ترتیب برای اینکه آیکون سمت چپ باشد
        createTageLi.appendChild(createTageA);
        createTageLi.appendChild(createIcon);
      } else {
        createTageLi.appendChild(createTageA);
      }

      // بررسی و اضافه کردن زیرمنو در صورت وجود
      if (item.submenu) {
        let subMenuUl = document.createElement("ul");
        subMenuUl.classList.add(
          "submenu",
          "hidden",
          "absolute",
          "bg-white",
          "shadow-lg",
          "p-2",
          "rounded-lg",
          "right-[9rem]",
          "top-[-3rem]"
        );

        item.submenu.forEach((subItem) => {
          let subLi = document.createElement("li");
          let subA = document.createElement("a");
          subA.href = subItem.href;
          subA.textContent = subItem.title;
          subA.classList.add(
            "block",
            "p-2",
            "hover:bg-gray-200",
            "transition-all",
            "duration-300",
            "text-black"
          );
          subLi.appendChild(subA);
          subMenuUl.appendChild(subLi);
        });

        createTageLi.appendChild(subMenuUl);

        // اضافه کردن رویداد هاور برای نمایش زیرمنو
        createTageLi.classList.add("relative", "group");
        createTageLi.addEventListener("mouseenter", () => {
          subMenuUl.classList.remove("hidden");
          subMenuUl.classList.add("block");
        });
        createTageLi.addEventListener("mouseleave", () => {
          subMenuUl.classList.add("hidden");
        });
      }

      listmegamenu.appendChild(createTageLi);
      listmegamenu.classList.add(
        "text-black",
        "text-[16px]",
        "mr-[56px]",
        "mt-[24px]"
      );
    });

    // ایجاد منوهای اضافی با قابلیت تصویر پس زمینه
    data.forEach((item, index) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      let a2 = document.createElement("a");
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let backgroundIcon = document.createElement("img"); // تصویر پس زمینه

      // تنظیمات لینک فارسی
      a.href = item.href;
      a.textContent = item.titlePersin;

      // تنظیمات لینک انگلیسی
      a2.href = item.href;
      a2.textContent = item.titleEnglish;

      // تنظیمات تصویر پس زمینه
      backgroundIcon.src = "../images/local/bgmegamenu.png";
      backgroundIcon.className = `
        absolute inset-0 w-[80px] h-[80px] z-0 opacity-0
        transition-opacity duration-300 object-cover
        pointer-events-none right-3 group-hover:opacity-30
      `;

      // اضافه کردن عناصر به divها
      div1.appendChild(a);
      div2.appendChild(a2);

      // اضافه کردن عناصر به li
      li.appendChild(backgroundIcon);
      li.appendChild(div1);
      li.appendChild(div2);

      // استایل‌های اصلی
      li.className = `
        flex flex-col items-center gap-1 relative
        p-2 cursor-pointer group menu-item
      `;
      div1.className =
        "text-center text-[14px] font-english text-[#909090] z-10";
      div2.className =
        "text-center text-[14px] font-english text-[#909090] z-10";

      // حالت پیش‌فرض برای اولین آیتم
      if (index === 0) {
        backgroundIcon.classList.add("opacity-100");
      }

      // رویداد کلیک برای تغییر تصویر پس زمینه
      li.addEventListener("click", function (e) {
        e.preventDefault();

        // حذف opacity از همه آیتم‌ها
        document.querySelectorAll(".menu-item").forEach((el) => {
          el.querySelector("img").classList.remove("opacity-100");
        });

        backgroundIcon.classList.add("opacity-100");
      });

      menuUl.appendChild(li);
    });

    menuUl.classList.add("grid", "grid-cols-7", "text-black", "pt-4");
  });

  loadComponent("Footer", "../layout/Footer.html");
});
