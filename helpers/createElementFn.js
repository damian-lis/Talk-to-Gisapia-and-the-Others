export default ({
  elementToCreate,
  text,
  classesName,
  src,
  attributes,
  disabled,
  eventListenerObj,
}) => {
  const createdElement = document.createElement(elementToCreate)
  if (text) {
    createdElement.innerText = text
  }

  if (src) {
    createdElement.src = src
  }

  if (disabled) {
    createdElement.disabled = disabled
  }

  if (eventListenerObj) {
    eventListenerObj.events.map((event) =>
      createdElement.addEventListener(event.name, (e) => {
        if (event.condition) {
          event.valueToChange
        } else {
          event.result
        }
      })
    )
  }
  classesName &&
    classesName.map((className) => createdElement.classList.add(className))

  attributes &&
    attributes.map((attribute) =>
      createdElement.setAttribute(`${attribute.type}`, `${attribute.name}`)
    )

  return createdElement
}
