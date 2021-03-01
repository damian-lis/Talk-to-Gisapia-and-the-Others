export default ({ name, classesToAdd }) => {
  const element = document.querySelector(name)
  classesToAdd.map((className) =>
    element.classList.add(`${name.substring(1)}-${className.toLowerCase()}`)
  )
}
