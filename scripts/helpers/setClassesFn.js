export default (objects) => {
  objects.map((object) => {
    console.log(`.${object.element}`)
    let element = object.element
    if (typeof object.element === 'string') {
      element = document.querySelector(`.${object.element}`)
    }
    element.className = object.element
    element.classList.add(...object.classes)
  })
}
