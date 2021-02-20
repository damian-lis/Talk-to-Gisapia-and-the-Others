import Memory from './Memory.js'
import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import InputPanelUI from './InputPanelUI.js'
import Screen from './Screen.js'
import messageWrapper from './helpers/messageWrapper.js'
import categories from './seeds/categories.js'

const memory = new Memory(categories)
const selectCharUi = new SelectCharUI('body')
const charsFactory = new CharsFactory()
const inputPanelUI = new InputPanelUI('.messenger-input-container')
const screen = new Screen('.messenger-screen-container')

selectCharUi.subscribe((charName) => {
  const character = charsFactory.getChar(charName)
  memory.setSelectedChar(character)
})

const startTalkingBtn = document.querySelector('#start-talking')

const handleCharTalking = () => {
  const character = memory.getChar()

  if (!character) {
    return alert('Wybierz rozmówcę!')
  }

  const conversationStep = memory.getConversationStep()
  const category = memory.getRightCategory(conversationStep)

  console.log(category)
}

startTalkingBtn.addEventListener('click', handleCharTalking)

const handleUserTalking = (userMessage) => {
  memory.setUserMessage(userMessage)
  const messageWrapped = messageWrapper(userMessage)
  screen.attachMessageContainer(messageWrapped)
}

inputPanelUI.subscribe(handleUserTalking)
