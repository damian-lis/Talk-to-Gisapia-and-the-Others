import Memory from './Memory.js'
import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import InputPanelUI from './InputPanelUI.js'
import Screen from './Screen.js'
import messageWrapper from './helpers/messageWrapper.js'
import categories from './seeds/categories.js'

const selectCharUISettings = {
  container: '.selectCharUI-container',
  charNames: ['Gisapia', 'Ted', 'Jessica'],
}

const memory = new Memory(categories)
const selectCharUi = new SelectCharUI(selectCharUISettings)
const charsFactory = new CharsFactory()
const inputPanelUI = new InputPanelUI('.messenger-input-container')
const screen = new Screen('.messenger-screen-container')

//Start part
const handleStartPart = (charName) => {
  selectCharUi.deleteButton('charButton')
  const character = charsFactory.getChar(charName)
  memory.setSelectedChar(character)
}

selectCharUi.subscribe(handleStartPart, 'selectChar')

//Character talking
const handleCharTalking = async () => {
  selectCharUi.deleteButton('startButton')
  const character = memory.getChar()

  if (!character) {
    return alert('Wybierz rozmówcę!')
  }

  const conversationStep = memory.getConversationStep()
  const category = memory.getRightCategory(conversationStep)
  const charQuestions = character.getQuestions(category)

  if (!charQuestions) return
  const numberOfQuestions = charQuestions.length

  for (let i = 0; i < numberOfQuestions; i++) {
    await character.mustThink(1000)
    await screen.showTyping(2000)
    await character.mustThink(1000)

    const charMessage = charQuestions[i]
    const messageWrapped = messageWrapper(charMessage, character.name)
    screen.attachToScreen(messageWrapped)
  }
}

selectCharUi.subscribe(handleCharTalking, 'charTalking')

//User talking
const handleUserTalking = (userMessage) => {
  memory.setUserMessage(userMessage)
  const messageWrapped = messageWrapper(userMessage, 'user')
  screen.attachToScreen(messageWrapped)

  memory.increaseConversationStep()
  handleCharTalking()
}

inputPanelUI.subscribe(handleUserTalking)
