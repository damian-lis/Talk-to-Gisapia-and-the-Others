import { types } from '/data/names.js';

export default ({ elementToRemove, removeFromElements }) => {
  if (!elementToRemove || !removeFromElements) return;

  let elToRemove = elementToRemove;
  let removeFromEls = removeFromElements;

  if (typeof elementToRemove === types.string) {
    elToRemove = document.querySelector(elementToRemove);
  }

  if (typeof removeFromElements === types.string) {
    removeFromEls = document.querySelectorAll(removeFromElements);
  }

  removeFromEls[removeFromEls.length - 1] &&
    removeFromEls[removeFromEls.length - 1]
      .querySelector(elementToRemove)
      .remove();
};
