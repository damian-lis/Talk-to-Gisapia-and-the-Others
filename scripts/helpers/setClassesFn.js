export default (objects) => {
  objects.map((object) => {
    object.elements.map((element) => {
      let el = element

      if (typeof element === 'string') {
        el = document.querySelector(`.${element}`)
      }

      el.className = object.initialClass
      el.classList.add(...object.classesToAdd)
    })
  })
}
