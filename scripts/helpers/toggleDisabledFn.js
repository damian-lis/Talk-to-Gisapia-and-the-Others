export default ({ setOn, removeFrom }) => {
  setOn.disabled = true
  removeFrom.map((el) => {
    el.disabled = false
  })
}
