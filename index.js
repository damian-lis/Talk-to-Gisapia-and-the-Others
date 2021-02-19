import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import Memory from './Memory.js'

const selectCharUi = new SelectCharUI('body')
const charsFactory = new CharsFactory()
const memory = new Memory()

selectCharUi.subscribe((charName) => {
  const character = charsFactory.getChar(charName)
  memory.setSelectedChar(character)

  console.log(memory)
})

const startTalkingBtn = document.querySelector('#start-talking')

const handleCharTalking = () => {
  const character = memory.getCharacter()

  if (!character) {
    return alert('Wybierz rozmówcę!')
  }
}

startTalkingBtn.addEventListener('click', handleCharTalking())
