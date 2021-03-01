export default (elements) => {
  elements.map((element) => {
    const el = document.querySelector(element.name)
    element.classesToAdd.map((className) =>
      el.classList.add(
        `${element.name.substring(1)}-${className.toLowerCase()}`
      )
    )
  })
  // const element = document.querySelector(name)
  // classesToAdd.map((className) =>
  //   element.classList.add(`${name.substring(1)}-${className.toLowerCase()}`)
  // )
}
