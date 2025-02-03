document.addEventListener("DOMContentLoaded", () => {
  function showSection(sectionId) {
    // تمام بخش‌ها را مخفی کن
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden");
    });

    // فقط بخش انتخاب‌شده را نمایش بده
    document.getElementById(sectionId).classList.remove("hidden");
  }

  // مقدار پیش‌فرض را نمایش بده
  showSection("editProfile");

  // رویداد کلیک برای هر گزینه منو
  document.querySelectorAll("aside nav ul li").forEach((item) => {
    item.addEventListener("click", function () {
      const sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      showSection(sectionId);
    });
  });
});
