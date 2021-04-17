export default (objects) => {
  objects.map((object) => {
    let element = object.element
    if (typeof object.element === 'string') {
      element = document.querySelector(`.${object.element}`)
    }
    element.className = object.element
    element.classList.add(...object.classes)
  })
}
