import { common } from '/data/names.js'

export default ({ elements = [], container }) => {
  if (!container) return

  let containerEl = container

  if (typeof container === common.string) {
    containerEl = document.querySelector(container)
  }

  elements.length &&
    elements.map((element) => {
      let el = element

      if (typeof el === common.string) {
        el = document.querySelector(innerEl)
      }

      if (Array.isArray(el)) {
        const innerEls = el
        innerEls.map((innerElement) => {
          let innerEl = innerElement

          if (typeof el === common.string) {
            innerEl = document.querySelector(innerElement)
          }
          containerEl.appendChild(innerEl)
        })
      } else containerEl.appendChild(el)
    })

  return containerEl
}
