import { common } from '/data/names.js'

export default ({ element, ...rest }) => {
  if (!element) return

  const createdElement = document.createElement(element)

  if (Object.keys(rest).length) {
    for (const propEl in rest) {
      switch (propEl) {
        case common.listeners:
          rest[propEl].map((listener) => {
            const { event, cb } = listener
            createdElement.addEventListener(event, (e) => cb(e))
          })
          break

        case common.attributes:
          rest[propEl].map((attribute) =>
            createdElement.setAttribute(
              `${attribute.name}`,
              `${attribute.value}`
            )
          )
          break

        case common.classes:
          createdElement.classList.add(...rest[propEl])
          break

        case common.styles:
          rest[propEl].map(
            (styleObj) => (createdElement.style[styleObj.name] = styleObj.value)
          )
          break

        default:
          if (
            createdElement.tagName === common.TEXTAREA &&
            propEl === common.type
          )
            break
          createdElement[propEl] = rest[propEl]
      }
    }
  }
  return createdElement
}
