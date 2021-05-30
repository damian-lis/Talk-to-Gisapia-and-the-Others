import { types, toggleValue } from '/data/names.js'

export default ({ toggle, objs, delay }) => {
  if (!objs) return

  const helperLogic = () => {
    objs.map((obj) => {
      if (!obj.classes) return

      if (obj.elements) {
        obj.elements.map((element) => {
          let el = element

          if (typeof element === types.string) {
            el = document.querySelector(element)
          }

          obj.classes.map((classEl) => {
            if (obj.removeFromElements) {
              obj.removeFromElements.map((removeFromElement) => {
                let removeFromEl = removeFromElement

                if (typeof removeFromElement === types.string) {
                  removeFromEl = document.querySelector(element)
                }

                removeFromEl.classList.remove(classEl)
                removeFromEl.disabled = false
              })
            }

            if (obj.initialClass) {
              el.className = obj.initialClass
            }

            if (toggle) {
              switch (toggle) {
                case toggleValue.on:
                  el.classList.add(classEl)
                  el.disabled = false
                  break
                case toggleValue.off:
                  el.classList.remove(classEl)
                  el.disabled = true
                  break

                default:
                  break
              }
            } else {
              el.classList.add(classEl)
            }
          })
        })
      } else {
        obj.classes.map((classEl) => {
          if (obj.removeFromElements) {
            obj.removeFromElements.map((removeFromElement) => {
              let removeFromEl = removeFromElement

              if (typeof removeFromElement === types.string) {
                removeFromEl = document.querySelector(element)
              }

              removeFromEl.classList.remove(classEl)
              removeFromEl.disabled = false
            })
          }
        })
      }
    })
  }

  if (delay) return setTimeout(helperLogic, delay)
  helperLogic()
}
