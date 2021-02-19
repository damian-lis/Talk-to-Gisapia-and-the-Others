import SelectCharUI from './SelectCharUI.js'
import Memory from './Memory.js'

const selectCharUi = new SelectCharUI('body')
const memory = new Memory()

selectCharUi.subscribe((character) => {
  memory.setSelectedChar(character)

  console.log(memory)
})
