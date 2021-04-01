export default (objects) => {
  objects.map((object) => {
    const container = document.querySelector(object.element)
    container.style.animation = object.animation
  })
}
