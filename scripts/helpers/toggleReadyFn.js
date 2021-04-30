import { common } from '/data/main.js'

export default ({ toggle, elements, classes }) => {
  elements.map((element) => {
    if (toggle === common.toggle.on) {
      element.disabled = false
      classes.map((classEl) => {
        element.classList.add(classEl)
      })
    } else {
      element.disabled = true
      classes.map((classEl) => {
        element.classList.remove(classEl)
      })
    }
  })
}
