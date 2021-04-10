export default ({ element, search }) => {
  let searchEls = search
  if (typeof search === 'string') {
    searchEls = document.querySelectorAll(search)
  }

  searchEls[searchEls.length - 1] &&
    searchEls[searchEls.length - 1].querySelector(element).remove()
}
