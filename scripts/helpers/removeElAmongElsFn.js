export default ({ element, elementsName, elements }) => {
  let els = elements
  if (elementsName) {
    els = document.querySelectorAll(elementsName)
  }
  els[els.length - 1] && els[els.length - 1].querySelector(element).remove()
}
