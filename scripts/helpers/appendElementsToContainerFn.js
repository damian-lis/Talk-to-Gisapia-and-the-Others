import { types } from '/data/names.js';

export default ({ elements, container }) => {
  if (!container || !elements) return;

  let containerEl = container;

  if (typeof container === types.string) {
    containerEl = document.querySelector(container);
  }

  elements.map((element) => {
    let el = element;

    if (typeof element === types.string) {
      el = document.querySelector(innerEl);
    }

    if (Array.isArray(el)) {
      const innerEls = el;
      innerEls.map((innerElement) => {
        let innerEl = innerElement;

        if (typeof innerElement === types.string) {
          innerEl = document.querySelector(innerElement);
        }
        containerEl.appendChild(innerEl);
      });
    } else containerEl.appendChild(el);
  });

  return containerEl;
};
