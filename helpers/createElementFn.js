export default ({ element, ...rest }) => {
  const createdElement = document.createElement(element)

  if (Object.keys(rest).length) {
    for (const propEl in rest) {
      if (propEl === 'listeners') {
        rest[propEl].map((events) => {
          const { event, cb } = events
          createdElement.addEventListener(event, (e, event) => {
            cb(e, event)
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
      } else if (propEl === 'cb') {
        rest[propEl](createdElement)
      } else createdElement[propEl] = rest[propEl]
    }
  }

  return createdElement
}
