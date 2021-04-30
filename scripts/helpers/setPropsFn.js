export default (objs) => {
  objs.map((obj) => {
    obj.elements.map((element) => {
      if (obj.styleProps) {
        obj.styleProps.map((prop) => {
          element.style[prop.name] = prop.value
        })
      } else {
        obj.props.map((prop) => {
          element.style[prop.name] = prop.value
        })
      }
    })
  })
}
