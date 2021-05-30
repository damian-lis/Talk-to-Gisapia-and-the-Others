import { types, toggleValue } from '/data/names.js'

export default ({ toggle, objs = [], delay }) => {
  const helperLogic = () =>
    objs.length &&
    objs.map((obj) =>
      obj.elements
        ? obj.elements.map((element) => {
            let el = element

            if (typeof element === types.string) {
              el = document.querySelector(element)
            }

            obj.classes &&
              obj.classes.map((classEl) => {
                obj.removeFromElements &&
                  obj.removeFromElements.map((removeFromElement) => {
                    let removeFromEl = removeFromElement

                    if (typeof removeFromElement === types.string) {
                      removeFromEl = document.querySelector(element)
                    }

                    removeFromEl.classList.remove(classEl)
                    removeFromEl.disabled = false
                  })

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

                if (obj.initialClass) {
                  el.className = obj.initialClass
                }

                !toggle && el.classList.add(classEl)
              })
          })
        : obj.classes &&
          obj.classes.map((classEl) => {
            obj.removeFromElements &&
              obj.removeFromElements.map((removeFromElement) => {
                let removeFromEl = removeFromElement

                if (typeof removeFromElement === types.string) {
                  removeFromEl = document.querySelector(element)
                }

                removeFromEl.classList.remove(classEl)
                removeFromEl.disabled = false
              })
          })
    )
  if (delay) return setTimeout(helperLogic, delay)
  helperLogic()
}
