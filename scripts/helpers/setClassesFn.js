import { types, common } from '/data/names.js'

export default ({ toggle, objs = [], delay }) => {
  const helperLogic = () =>
    objs.length &&
    objs.map((obj) =>
      obj.elements
        ? obj.elements.map((el) => {
            let element = el

            if (typeof el === types.string) {
              element = document.querySelector(el)
            }

            obj.classes &&
              obj.classes.map((classEl) => {
                obj.removeFromEls &&
                  obj.removeFromEls.map((removeFromEl) => {
                    removeFromEl.classList.remove(classEl)
                    removeFromEl.disabled = false
                  })

                switch (toggle) {
                  case common.on:
                    element.classList.add(classEl)
                    element.disabled = false
                    break
                  case common.off:
                    element.classList.remove(classEl)
                    element.disabled = true
                    break

                  default:
                    break
                }

                if (obj.initialClass) {
                  element.className = obj.initialClass
                }

                !toggle && element.classList.add(classEl)
              })
          })
        : obj.classes &&
          obj.classes.map((classEl) => {
            obj.removeFromEls &&
              obj.removeFromEls.map((removeFromEl) => {
                removeFromEl.classList.remove(classEl)
                removeFromEl.disabled = false
              })
          })
    )
  if (delay) return setTimeout(helperLogic, delay)
  helperLogic()
}
