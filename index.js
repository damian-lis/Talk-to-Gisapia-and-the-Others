import SelectCharUI from './SelectCharUI.js'

const selectCharUi = new SelectCharUI('body')

selectCharUi.subscribe((charName) => {
  console.log(charName)
})
