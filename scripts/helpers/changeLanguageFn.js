export default ({ objs, lng }) => {
  objs.map((obj) => {
    obj.element[obj.prop] = obj.value[lng]
  })
}
