const menuToggle = document.querySelector(".main-nav__btn");
const mainNavList = document.querySelector(".main-nav__list");
const sortBtn = document.querySelectorAll(".sort-by__type");
const catFavoriteToggle = document.querySelectorAll(".cat__favorite-btn");
const catFavoritePromt = document.querySelector(".cat__favorite-promt");
const subscribeForm = document.querySelector(".subscribe__form");
const subscriberEmail = document.querySelector(".subscribe__email");
const scrollBtn = document.getElementById("scroll-btn");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("main-nav__btn--active");
  mainNavList.classList.toggle("main-nav__list--open");
});

scrollBtn.addEventListener("click", function scrollUp() {
  document.body.scrollIntoView({
    block: "start",
    behavior: "smooth"
  });
});

window.addEventListener("scroll", function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

sortBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.classList.toggle("sort-by__type--up");
  });
});

catFavoriteToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("cat__favorite-btn--added")) {
      btn.querySelector(".cat__favorite-promt").style.opacity = "1";
      const timeId = setTimeout(() => {
        btn.querySelector(".cat__favorite-promt").style.opacity = "0";
        clearTimeout(timeId);
      }, 700);
    }
    btn.classList.toggle("cat__favorite-btn--added");
  });
});

const emailIsValid = email => {
  if (!email) {
    return false;
  }
  return /\S+@\S+\.\S+/.test(email);
};

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = subscriberEmail.value;
  if (emailIsValid(email)) {
    subscribeForm.submit()
  }
  if (!emailIsValid(email)) {
    subscriberEmail.style.boxShadow = "0px 0px 0px 2px red inset";
  }
});
