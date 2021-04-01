export default ({ element, search }) => {
  const elements = document.querySelectorAll(search)
  elements[elements.length - 1] &&
    elements[elements.length - 1].querySelector(element).remove()
}
