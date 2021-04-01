export default (objects) => {
  objects.map((object) => {
    let element = document.querySelector(object.element)
    if (typeof object.element !== 'string') {
      element = object.element
    }
    object.newClasses.map((className) =>
      element.classList.add(`${className.toLowerCase()}`)
    )
  })
}
