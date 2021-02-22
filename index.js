import memory from './Memory.js'
import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import InputPanelUI from './InputPanelUI.js'
import Screen from './Screen.js'

const selectCharUISettings = {
  container: '.selectCharUI-container',
  charNames: ['Gisapia', 'Ted', 'Jessica'],
}

const selectCharUi = new SelectCharUI(selectCharUISettings)
const charsFactory = new CharsFactory()
const inputPanelUI = new InputPanelUI('.messenger-input-container')
const screen = new Screen('.messenger-screen-container')

//Wydzielić do helpers
const showMessenger = () => {
  const messenger = document.querySelector('.messenger')
  messenger.classList.add('fallFromAbove')
}

const countTimeForTyping = (number, speed) => {
  const result = number * speed
  return result > 2000 ? 2000 : result
}

const countTypingQuantity = (number) => {
  let result
  if (number < 20) {
    result = 1
  } else if (number >= 20) {
    result = 2
  }
  return result
}

//Start part
const handleStartPart = (charName) => {
  if (charName !== 'Gisapia') {
    return alert('Ta postać na razie jest niedostępna. Wybierz inną!')
  }

  selectCharUi.deleteButton('charButton')
  const character = charsFactory.getChar(charName)
  memory.setSelectedChar(character)
}

selectCharUi.subscribe(handleStartPart, 'selectChar')

//Character talking
const handleCharTalking = async () => {
  const character = memory.getChar()

  if (!character) {
    return alert('Wybierz rozmówcę!')
  }
  selectCharUi.deleteButton('startButton')

  showMessenger()

  const conversationStep = memory.getConversationStep()
  const category = memory.getCategory(conversationStep)
  const charQuestions = character.getQuestions(category)
  if (!charQuestions) return

  for (let i = 0; i < charQuestions.length; i++) {
    const charMessage = charQuestions[i]

    let timeForTyping = countTimeForTyping(charMessage.length, 80)
    const typingQuantity = countTypingQuantity(charMessage.length)

    for (let i = 0; i < typingQuantity; i++) {
      if (i === 1) {
        timeForTyping = timeForTyping - 100 * Math.floor(Math.random() * 15 + 5)
        console.log(timeForTyping)
      }

      await character.mustThink(1000)
      await screen.showTyping(timeForTyping)
    }

    const messageContainer = screen.createMessageContainer()
    const message = screen.createMessage(charMessage, character.name)
    const avatar = screen.createAvatar(character.avatar)
    screen.attachToMessageContainer(messageContainer, message, avatar)
    screen.attachToScreen(messageContainer)
  }

  inputPanelUI.activatePanel()
}

selectCharUi.subscribe(handleCharTalking, 'charTalking')

//User talking
const handleUserTalking = (userMessage) => {
  memory.setUserMessage(userMessage)

  const messageContainer = screen.createMessageContainer()
  const message = screen.createMessage(userMessage, 'user')
  screen.attachToMessageContainer(messageContainer, message)
  screen.attachToScreen(messageContainer)

  memory.increaseConversationStep()
  inputPanelUI.deactivatePanel()
  handleCharTalking()
}

inputPanelUI.subscribe(handleUserTalking)

//Dodaj tą zaleznosc od dlugosci tekstu
