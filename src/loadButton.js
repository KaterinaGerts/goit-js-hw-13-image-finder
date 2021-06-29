import { refs } from "./refs.js";

export function scrollIntoView() {
  refs.loadBtnEl.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
