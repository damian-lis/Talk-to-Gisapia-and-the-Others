import memory from './Memory.js'
import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import InputPanelUI from './InputPanelUI.js'
import Screen from './Screen.js'
import showMessenger from './helpers/showMessenger.js'
import countTimeForTyping from './helpers/countTimeForTyping.js'
import countTypingQuantity from './helpers/countTypingQuantity.js'

document.addEventListener('DOMContentLoaded', function () {
  const selectCharUISettings = {
    container: '.selectCharUI-container',
    charNames: ['Gisapia', 'Ted', 'Jessica'],
  }

  const selectCharUi = new SelectCharUI(selectCharUISettings)
  const charsFactory = new CharsFactory()
  const inputPanelUI = new InputPanelUI('.messenger-input-container')
  const screen = new Screen('.messenger-screen-container')

  //Select character part
  const handleSelectChar = (charName) => {
    if (charName !== 'Gisapia')
      return alert('Ta postać na razie jest niedostępna. Wybierz inną!')

    selectCharUi.deleteButton('charButton')
    const character = charsFactory.getChar(charName)
    memory.setSelectedChar(character)
  }

  selectCharUi.subscribe(handleSelectChar, 'selectChar')

  const checkSelectedChar = () => {
    const character = memory.getChar()

    if (!character) return alert('Wybierz rozmówcę!')

    selectCharUi.deleteButton('startButton')

    showMessenger()
    handleCharTalking()
  }

  //Character talking
  const handleCharTalking = async () => {
    const character = memory.getChar()
    const conversationStep = memory.getConversationStep()
    const category = memory.getCategory(conversationStep)
    const userMessage = memory.getUserMessage()
    const messageCollection = character.getMessagesCollection(category)
    let charMessages = messageCollection.messages

    if (memory.getIsListening()) {
      character.addToMemoryAboutUser(userMessage, category)
      messageCollection.answers.addedToMemory[0] += ` ${userMessage}`
      charMessages = messageCollection.answers.addedToMemory
      memory.setUserMessage('')
      memory.setIsCallAgain(true)
      memory.setIsListening(false)
    } else {
      if (userMessage) {
        const elementFromMemory = character.checkUserMessageInMemory(
          userMessage,
          category
        )

        if (elementFromMemory) {
          character.addToMemoryAboutUser(elementFromMemory, category)
          messageCollection.answers.isInMemory[0] += ` ${elementFromMemory}`
          charMessages = messageCollection.answers.isInMemory
          memory.setUserMessage('')
          memory.setIsCallAgain(true)
        } else {
          charMessages = messageCollection.answers.isNotInMemory
          memory.setIsListening(true)
        }
      }
    }

    for (let i = 0; i < charMessages.length; i++) {
      const charMessage = charMessages[i]

      let timeForTyping = countTimeForTyping(charMessage.length, 80)
      const typingQuantity = countTypingQuantity(charMessage.length)

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5)

          timeForTyping = timeForTyping - timeForReduceTyping
        }

        timeForTyping = timeForTyping < 1000 ? 1000 : timeForTyping

        await character.mustThink(500)
        await screen.showTyping(timeForTyping)
      }

      const messageContainer = screen.createMessageContainer()
      const message = screen.createMessage(charMessage, character.name)
      const avatar = screen.createAvatar(character.avatar)

      screen.attachToMessageContainer(messageContainer, message, avatar)
      screen.attachToScreen(messageContainer)
    }

    if (memory.getIsCallAgain()) {
      memory.setIsCallAgain(false)
      memory.increaseConversationStep()
      return handleCharTalking()
    }

    inputPanelUI.activatePanel()
  }

  selectCharUi.subscribe(checkSelectedChar, 'charTalking')

  //User talking
  const handleUserTalking = (userMessage) => {
    memory.setUserMessage(userMessage)

    const messageContainer = screen.createMessageContainer()
    const message = screen.createMessage(userMessage, 'user')
    screen.attachToMessageContainer(messageContainer, message)
    screen.attachToScreen(messageContainer)

    inputPanelUI.deactivatePanel()
    handleCharTalking()
  }

  inputPanelUI.subscribe(handleUserTalking)
})
