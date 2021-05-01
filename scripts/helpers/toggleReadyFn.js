import { common } from '/data/main.js'

export default ({ toggle, elements, classes }) => {
  elements.map((element) => {
    switch (toggle) {
      case common.toggle.on:
        element.disabled = false
        classes.map((classEl) => {
          element.classList.add(classEl)
        })
        break

      case common.toggle.off:
        element.disabled = true
        classes.map((classEl) => {
          element.classList.remove(classEl)
        })

      default:
        break
    }
  })
}
