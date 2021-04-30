export default ({ objs = [], initial = false }) => {
  objs.map((obj) => {
    obj.elements.map((element) => {
      element.style.display = initial ? obj.initial : obj.target
    })
  })
}
