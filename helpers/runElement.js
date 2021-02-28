export default (elements) => {
  elements.map((element) => {
    const container = document.querySelector(element.name)
    container.style.animation = element.animation
  })
}
