import { common } from '/data/main.js'

export default (objects) => {
  objects.map((object) => {
    object.elements.map((element) => {
      let el = element

      if (typeof element === common.string) {
        el = document.querySelector(`.${element}`)
      }

      el.className = object.initialClass
      el.classList.add(...object.classesToAdd)
    })
  })
}
