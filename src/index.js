import debounce from "lodash.debounce";
import "./styles.css";
import { refs } from "./refs.js";
import API from "./apiService";
import { loadBtn } from "./loadButton";
import cardForm from "../template/cardsForm.hbs";

refs.inputEl.addEventListener("input", debounce(onInputValue,1000));
refs.loadBtnEl.addEventListener('click', onBtnClick);

//функция кнопки load more
function onBtnClick(e) {
  if(e.target.length === 0) {
    refs.loadBtnEl.classList.add('.is-hidden');
  } refs.loadBtnEl.classList.remove('.is-hidden');
}

// получаю значение из инпута
function onInputValue(e) {
  console.log(e.target.value);
  const imageName = e.target.value; 
  if (!imageName) {
    return;
  }
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
  const cardMarkUp = cardForm(...images);
  clearImageCard(refs.galleryItemEl); 
  createMarkUp(refs.galleryItemEl,cardMarkUp);

   loadBtn();
}
