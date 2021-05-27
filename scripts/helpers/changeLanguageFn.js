import { types } from '/data/names.js'

export default ({ objs = [], lng }) =>
  objs.length &&
  objs.map((obj) => {
    let element = obj.element

    if (typeof el === types.string) {
      element = document.querySelector(obj.element)
    }

    if (obj.props.name && obj.props.value) {
      element[obj.props.name] = obj.props.value[lng]
    }
  })
