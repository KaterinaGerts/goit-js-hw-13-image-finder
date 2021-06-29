import debounce from "lodash.debounce";
import "./styles.css";
import { refs } from "./refs.js";
import API from "./apiService";
import { resetPage } from "./apiService";
import {modalImage} from "./modal";
import { scrollIntoView } from "./loadButton";
import cardForm from "../template/cardsForm.hbs";

refs.inputEl.addEventListener("input", debounce(onInputValue, 1000));
refs.loadBtnEl.addEventListener("click", onBtnClick);
refs.galleryItemEl.addEventListener('click', onGalleryClick);

let imageName = "";

//функция для открытия модального окна
function onGalleryClick(e) {
const currentImage = e.target;
modalImage.show();
const image = document.querySelector('.large-image');
image.src = currentImage.dataset.attribute;
image.alt = currentImage.alt;
}

//функция кнопки load more
function onBtnClick() {
  fetchImages(imageName);  
}

// получаю значение из инпута
function onInputValue(e) {
  e.preventDefault();

  imageName = e.target.value;
  if (!imageName) {
    clearImageCard();
    refs.loadBtnEl.classList.add("is-hidden");
    refs.buttonUp.classList.add("is-hidden");
    return;
  }
  clearImageCard();
  resetPage();
  fetchImages(imageName);
}

// объявление функции, которая делает запрос в API
function fetchImages(imageName) {
  API(imageName)
    .then((data) => renderImageResult(data))
    .catch((error) => console.log(error));
}

// функция, которая очищает от разметки
function clearImageCard() {
  refs.galleryItemEl.innerHTML = "";
}

//функция, которая создает разметку
//elem - ссылка на DOM элемент, т.е тэг html, в который вставляется разметка шаблона
// template - вызов шаблона hbs(сам шаблон)
function createMarkUp(elem, template) {
  elem.insertAdjacentHTML("beforeend", template);
}

// функция, которая отвечает за отрисовку рендер результата
function renderImageResult(images) {
  const cardMarkUp = cardForm(images);
  createMarkUp(refs.galleryItemEl, cardMarkUp);
  scrollIntoView();
  refs.loadBtnEl.classList.remove("is-hidden");
  refs.buttonUp.classList.remove("is-hidden");
}
