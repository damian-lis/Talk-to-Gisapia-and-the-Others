export default ({ element, ...rest }) => {
  const createdElement = document.createElement(element)

  if (Object.keys(rest).length) {
    for (const propEl in rest) {
      if (propEl === 'listeners') {
        rest[propEl].map((listener) => {
          const { event, cb } = listener
          createdElement.addEventListener(event, (e) => {
            cb(e)
          })
        })
      } else if (propEl === 'attributes') {
        rest[propEl].map((attribute) => {
          createdElement.setAttribute(`${attribute.type}`, `${attribute.name}`)
        })
      } else if (propEl === 'classes') {
        createdElement.classList.add(...rest[propEl])
      } else if (propEl === 'styles') {
        rest[propEl].map((styleObj) => {
          createdElement.style[styleObj.name] = styleObj.value
        })
      } else createdElement[propEl] = rest[propEl]
    }
  }

  return createdElement
}
