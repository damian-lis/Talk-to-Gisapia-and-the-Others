import { common, types } from '/data//names.js'

export default ({ toggle, objs = [], delay }) => {
  const helperLogic = () =>
    objs.length &&
    objs.map(
      (obj) =>
        obj.elements &&
        obj.elements.map((el) => {
          let element = el

          if (typeof el === types.string) {
            element = document.querySelector(el)
          }

          obj.listeners &&
            obj.listeners.map((listener) => {
              const { event, cb } = listener
              element.addEventListener(event, (e) => cb(e))
            })

          obj.styleProps &&
            obj.styleProps.map((prop) => {
              if (toggle) {
                element.style[prop.name] =
                  toggle === common.on ? prop.values.on : prop.values.off
              } else element.style[prop.name] = prop.value
            })

          obj.props &&
            obj.props.map((prop) => {
              if (toggle) {
                element[prop.name] =
                  toggle === common.on ? prop.values.on : prop.values.off
              } else element[prop.name] = prop.value
            })
        })
    )
  if (delay) return setTimeout(helperLogic, delay)
  helperLogic()
}
