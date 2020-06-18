"use strict"

const mapLink = document.querySelector(".contacts__link");
const mapModal = document.querySelector(".modal-map");
const mapButtonClose = document.querySelector(".modal-map__close");

const writeusLink = document.querySelector(".contacts__button");
const writeusModal = document.querySelector(".writeus")
const writeusButtonClose = document.querySelector(".writeus__close")
const writeusVisitorName = document.querySelector("[name = person]");
const writeusVisitorEmail = document.querySelector("[name = person-email]");
const writeusVisitorMessage = document.querySelector("[name = person-message]");
const writeusForm = document.querySelector(".writeus__form");
let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

const promoButtons = document.querySelectorAll(".slider__button");
const promoSlides = document.querySelectorAll(".slider__container");
let promoSlideIndex = 0;

const servicesButtons = document.querySelectorAll(".services__button");
const servicesSlides = document.querySelectorAll(".services__container");
let servicesSlideIndex = 0;

// Проверка localStorage

try {
  storageName = localStorage.getItem("visitorName");
  storageEmail = localStorage.getItem("visitorEmail");
} catch (error) {
  isStorageSupport = false;
}


// Смена слайдов Промо

showPromoSlides(promoSlideIndex);

for (let i = 0; i < promoButtons.length; i++) {
promoButtons[i].addEventListener("click", (evt) => {
  evt.preventDefault();
  promoCurrentSlide(i);
  });
};

// Установка текущего слайда

function promoCurrentSlide(n) {
  showPromoSlides(promoSlideIndex = n);
}

// Функция переключения слайдов

function showPromoSlides(slideIndex) {
  let i;

  for (i = 0; i < promoSlides.length; i++) {
    if (promoSlides[i].classList.contains("slider__container--current")) {
      promoSlides[i].classList.remove("slider__container--current");
    };
  }

  for (i = 0; i < promoButtons.length; i++) {
    if (promoButtons[i].classList.contains("slider__button--checked")) {
      promoButtons[i].classList.remove("slider__button--checked");
    };
  }

  promoSlides[slideIndex].classList.add("slider__container--current");
  promoButtons[slideIndex].classList.add("slider__button--checked");
}

// Смена слайдов Сервисов

showServicesSlides(servicesSlideIndex);

for (let i = 0; i < servicesButtons.length; i++) {
servicesButtons[i].addEventListener("click", (evt) => {
  evt.preventDefault();
  servicesCurrentSlide(i);
  });
};

// Установка текущего слайда

function servicesCurrentSlide(n) {
  showServicesSlides(servicesSlideIndex = n);
}

// Функция переключения слайдов

function showServicesSlides(slideIndex) {
  let i;

  for (i = 0; i < servicesSlides.length; i++) {
    if (servicesSlides[i].classList.contains("services__container--current")) {
      servicesSlides[i].classList.remove("services__container--current");
    };
  }

  for (i = 0; i < servicesButtons.length; i++) {
    if (servicesButtons[i].classList.contains("services__button--current")) {
      servicesButtons[i].classList.remove("services__button--current");
    };
  }

  servicesSlides[slideIndex].classList.add("services__container--current");
  servicesButtons[slideIndex].classList.add("services__button--current");
}

//Открытие и закрытие карты

mapLink.addEventListener("click", (evt) => {
  evt.preventDefault();
  mapModal.classList.add("modal--show");
  mapButtonClose.focus();
});

mapButtonClose.addEventListener("click", () => {
  mapModal.classList.remove("modal--show");
})

// Закрытие по ESC

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapModal.classList.contains("modal--show")) {
      evt.preventDefault();
      mapModal.classList.remove("modal--show");
    }
  }
});

// Открытие и закрытие формы

writeusLink.addEventListener("click", (evt) => {
  evt.preventDefault();
  writeusModal.classList.add("modal--show");

  if (isStorageSupport) {
    if (storageName && storageEmail) {
      writeusVisitorName.value = storageName;
      writeusVisitorEmail.value = storageEmail;
      writeusVisitorMessage.focus();
    } else {writeusVisitorName.focus();}
  } else {
    writeusVisitorName.focus();
  }
});

writeusButtonClose.addEventListener("click", () => {
  writeusModal.classList.remove("modal--show");
  writeusModal.classList.remove("modal--error");
})

// Закрытие по ESC

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (writeusModal.classList.contains("modal--show")) {
      evt.preventDefault();
      writeusModal.classList.remove("modal--show");
      writeusModal.classList.remove("modal--error");
    }
  }
});

// Валидация формы

writeusForm.addEventListener("submit", (evt) => {
  if (!writeusVisitorName.value || !writeusVisitorEmail.value || !writeusVisitorMessage.value) {
    evt.preventDefault();
    writeusModal.classList.remove("modal--error");
    void writeusModal.offsetWidth;
    writeusModal.classList.add("modal--error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("visitorName", writeusVisitorName.value);
      localStorage.setItem("visitorEmail", writeusVisitorEmail.value);
    }
  }
});
