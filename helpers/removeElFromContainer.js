export default (elToRemove, selectThrough) => {
  const elements = document.querySelectorAll(selectThrough)
  if (elements[elements.length - 1]) {
    elements[elements.length - 1].querySelector(elToRemove).remove()
  }
}
