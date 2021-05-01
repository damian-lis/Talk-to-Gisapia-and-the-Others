export default (list, lng) => {
  list.map((item) => {
    item.element[item.props.name] = item.props.value[lng]
  })
}
