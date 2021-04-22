export default ({ element, ...rest }) => {
  const createdElement = document.createElement(element)

  if (Object.keys(rest).length) {
    for (const propEl in rest) {
      switch (propEl) {
        case 'listeners':
          rest[propEl].map((listener) => {
            const { event, cb } = listener
            createdElement.addEventListener(event, (e) => {
              cb(e)
            })
          })
          break

        case 'attributes':
          rest[propEl].map((attribute) => {
            createdElement.setAttribute(
              `${attribute.type}`,
              `${attribute.name}`
            )
          })
          break

        case 'classes':
          createdElement.classList.add(...rest[propEl])
          break

        case 'styles':
          rest[propEl].map((styleObj) => {
            createdElement.style[styleObj.name] = styleObj.value
          })
          break

        default:
          createdElement[propEl] = rest[propEl]
          break
      }
    }
  }
  return createdElement
}
