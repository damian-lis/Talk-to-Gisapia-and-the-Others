export default (elements, container) => {
  elements.map((el) => {
    container.appendChild(el)
  })

  return container
}
