export default (elements) => {
  elements.map((element) => {
    const el = document.querySelector(element.name)
    element.classesToAdd.map((className) =>
      el.classList.add(`${className.toLowerCase()}`)
    )
  })
}
