export default ({ elementToRemove, whereToLook }) => {
  const elements = document.querySelectorAll(whereToLook)
  elements[elements.length - 1] &&
    elements[elements.length - 1].querySelector(elementToRemove).remove()
}
