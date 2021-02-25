import memory from './Memory.js'
import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import InputPanelUI from './InputPanelUI.js'
import Screen from './Screen.js'
import showMessenger from './helpers/showMessenger.js'

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

  //Character talking process
  const handleCharTalking = async () => {
    let userMessage = memory.getUserMessage()
    const conversationStep = memory.getConversationStep()
    const character = memory.getChar()
    const category = character.getCategory(conversationStep)

    if (category === 'summary') {
      const dataCategories = character.getAllCategories()
      character.addAboutUserToMessages(dataCategories, conversationStep)
      // if (userMessage === 'Wyślij dane') {

      // } else {
      //   console.log('nie wysyłam danych')
      // }
    }

    let charMessages = character.getMessages(conversationStep)

    //Part when character wants to save new word in his memory
    if (memory.getIsListening()) {
      userMessage = character.setUpperLetter(userMessage)
      character.addToMemoryAboutUser(category, userMessage)
      if (conversationStep === 1) {
        character.addUserMessageToAnswer(userMessage, conversationStep, {
          place: 'start',
          where: 'addedToMemory',
        })
      } else {
        character.addUserMessageToAnswer(userMessage, conversationStep, {
          place: 'end',
          where: 'addedToMemory',
        })
      }
      charMessages = character.getAnswers(conversationStep, {
        type: 'addedToMemory',
      })
      memory.setUserMessage('')
      memory.setIsCallAgain(true)
      memory.setIsListening(false)
    }
    // Part where character checks typed word in his memory
    else {
      if (userMessage) {
        const elementFromMemory = character.checkUserMessageInMemory(
          category,
          userMessage
        )

        if (elementFromMemory) {
          character.addToMemoryAboutUser(category, elementFromMemory)
          if (conversationStep === 1) {
            character.addUserMessageToAnswer(
              elementFromMemory,
              conversationStep,
              {
                place: 'start',
                where: 'isInMemory',
              }
            )
          } else {
            character.addUserMessageToAnswer(
              elementFromMemory,
              conversationStep,
              {
                place: 'end',
                where: 'isInMemory',
              }
            )
          }

          charMessages = character.getAnswers(conversationStep, {
            type: 'isInMemory',
          })
          memory.setUserMessage('')
          memory.setIsCallAgain(true)
        } else {
          charMessages = character.getAnswers(conversationStep, {
            type: 'isNotInMemory',
          })
          memory.setIsListening(true)
        }
      }
    }

    //Part about character typing
    for (let i = 0; i < charMessages.length; i++) {
      const charMessage = charMessages[i]

      let timeForTyping = character.countTimeForTyping(charMessage.length, 80)
      const typingQuantity = character.countTypingQuantity(charMessage.length)

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          timeForTyping = character.changeTimeForTyping(timeForTyping)
        }

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

  //User talking process
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
