import memory from './Memory.js'
import SelectCharUI from './SelectCharUI.js'
import CharsFactory from './CharsFactory.js'
import InputPanelUI from './InputPanelUI.js'
import Screen from './Screen.js'
import showMessenger from './helpers/showMessenger.js'
import hideMessenger from './helpers/hideMessenger.js'
import { sendAboutUser } from './actions/dataActions.js'
import pageReload from './helpers/pageReload.js'
import showReloadButton from './helpers/showReloadButton.js'
import {
  charNames,
  answerVariants,
  categories,
  buttons,
  communiques,
  subscriberTypes,
} from './data/globalNames.js'

document.addEventListener('DOMContentLoaded', function () {
  const selectCharUISettings = {
    container: '.selectCharUI-container',
    charNames: ['Gisapia', 'Ted', 'Jessica'],
  }

  const selectCharUi = new SelectCharUI('.selectCharUI-container', charNames)
  const charsFactory = new CharsFactory()
  const inputPanelUI = new InputPanelUI('.messenger-input-container')
  const screen = new Screen('.messenger-screen-container')

  //Select character part
  const handleSelectChar = (charName) => {
    if (charName !== charNames.gisapia)
      return alert(communiques.characterDoesntExist)

    selectCharUi.deleteButton(buttons.types.character)
    const chosenChar = charsFactory.getChar(charName)
    memory.setSelectedChar(chosenChar)
  }

  selectCharUi.subscribe(handleSelectChar, subscriberTypes.selectChar)

  const checkSelectedChar = () => {
    const chosenChar = memory.getChar()

    if (!chosenChar) return alert(communiques.selectChar)

    selectCharUi.deleteButton(buttons.types.start)

    showMessenger()
    handleCharTalking()
  }

  //Character talking process
  const handleCharTalking = async () => {
    let userMessage = memory.getUserMessage()
    const conversationStep = memory.getConversationStep()
    const chosenChar = memory.getChar()
    const currentCategory = chosenChar.getCurrentCategory(conversationStep)

    if (memory.getIsFinish()) {
      if (userMessage === 'zapisz') {
        sendAboutUser(chosenChar.getMemoryAboutUser())
      }
      return setTimeout(() => {
        hideMessenger()
        showReloadButton(pageReload)
      }, 2000)
    }

    if (currentCategory === categories.summary) {
      memory.setIsFinish(true)
      const dataCategories = chosenChar.getAllCategories()
      chosenChar.addAboutUserToMessages(dataCategories, conversationStep)
    }

    let charMessages = chosenChar.getMessages(conversationStep)

    //Part when character wants to save new word in his memory
    if (memory.getIsListening()) {
      userMessage = chosenChar.setUpperLetter(userMessage)
      chosenChar.addToMemoryAboutUser(currentCategory, userMessage)
      if (currentCategory === categories.origin) {
        chosenChar.addUserMessageToAnswer(userMessage, conversationStep, {
          place: 'start',
          where: answerVariants.isInMemory,
        })
      } else {
        chosenChar.addUserMessageToAnswer(userMessage, conversationStep, {
          place: 'end',
          where: answerVariants.addedToMemory,
        })
      }
      charMessages = chosenChar.getAnswers(conversationStep, {
        from: answerVariants.addedToMemory,
      })
      memory.setUserMessage('')
      memory.setIsCallAgain(true)
      memory.setIsListening(false)
    }
    // Part where character checks typed word in his memory
    else {
      if (userMessage) {
        const elementFromMemory = chosenChar.checkUserMessageInMemory(
          currentCategory,
          userMessage
        )

        if (elementFromMemory) {
          chosenChar.addToMemoryAboutUser(currentCategory, elementFromMemory)
          if (
            currentCategory === categories.origin ||
            currentCategory === categories.hobby
          ) {
            chosenChar.addUserMessageToAnswer(
              elementFromMemory,
              conversationStep,
              {
                place: 'start',
                where: answerVariants.isInMemory,
              }
            )
          } else {
            chosenChar.addUserMessageToAnswer(
              elementFromMemory,
              conversationStep,
              {
                place: 'end',
                where: answerVariants.isInMemory,
              }
            )
          }

          charMessages = chosenChar.getAnswers(conversationStep, {
            from: answerVariants.isInMemory,
          })
          memory.setUserMessage('')
          memory.setIsCallAgain(true)
        } else {
          charMessages = chosenChar.getAnswers(conversationStep, {
            from: answerVariants.isNotInMemory,
          })
          memory.setIsListening(true)
        }
      }
    }

    //Part about character typing

    for (let i = 0; i < charMessages.length; i++) {
      const charMessage = charMessages[i]

      let timeForTyping = chosenChar.countTimeForTyping(charMessage.length, 80)
      const typingQuantity = chosenChar.countTypingQuantity(charMessage.length)

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          timeForTyping = chosenChar.changeTimeForTyping(timeForTyping)
        }

        await chosenChar.mustThink(500)
        await screen.showTyping(timeForTyping)
      }

      const messageContainer = screen.createMessageContainer()
      const message = screen.createMessage(charMessage, chosenChar.name)
      const avatar = screen.createAvatar(chosenChar.avatar)

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

  selectCharUi.subscribe(checkSelectedChar, subscriberTypes.charTalking)

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
