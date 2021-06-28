import { refs } from "./refs.js";

export const element = document.getElementById('my-element-selector');
refs.loadBtnEl.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});