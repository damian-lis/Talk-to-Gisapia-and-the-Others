import { sendAboutUser } from './actions/dataActions.js'
import {
  memory,
  SelectCharUI,
  CharsFactory,
  InputPanelUI,
  Screen,
} from './objects/index.js'

import { runElement } from '../helpers/index.js'
import {
  charNames,
  answerVariants,
  categories,
  subscriberTypes,
} from './data/globalNames.js'

document.addEventListener('DOMContentLoaded', function () {
  const selectCharUi = new SelectCharUI(charNames, '.selectCharUI')
  const charsFactory = new CharsFactory()
  const inputPanelUI = new InputPanelUI('.messenger-interface')
  const screen = new Screen('.messenger-screen')

  //Select character part
  const handleSelectChar = (charName) => {
    const chosenChar = charsFactory.getChar(charName)
    memory.setSelectedChar(chosenChar)
  }
  selectCharUi.subscribe(handleSelectChar, subscriberTypes.selectChar)

  const checkSelectedChar = () => {
    const chosenChar = memory.getChar()

    if (!chosenChar) {
      return alert('Wybierz rozmówcę!')
    } else if (chosenChar.name === null) {
      memory.setSelectedChar(null)
      alert('Dostepna w przyszłości')
      return selectCharUi.removeActive(selectCharUi.getCharButtons())
    }

    runElement([
      {
        name: '.selectCharUI',
        animation: 'bottomHide forwards 1s',
      },
      {
        name: '.messenger',
        animation: 'fallFromAbove 2s forwards',
      },
    ])
    handleCharTalking()
  }

  //Character talking process
  const handleCharTalking = async () => {
    let userMessage = memory.getUserMessage()
    const chosenChar = memory.getChar()
    const conversationStep = memory.getConversationStep()
    const currentScriptCategory = chosenChar.getCurrentScriptCategory(
      conversationStep
    )

    if (memory.getIsFinish()) {
      if (userMessage === 'zapisz') {
        sendAboutUser(chosenChar.getMemoryAboutUser())
      }
      return setTimeout(() => {
        runElement([
          {
            name: '.selectCharUI',
            animation: 'bottomHide reverse 1s',
          },
          {
            name: '.messenger',
            animation: 'backToTheTop 2s forwards',
          },
        ])
        selectCharUi.showEndMessage()
      }, 2000)
    }

    if (currentScriptCategory === categories.summary) {
      memory.setIsFinish(true)
      const scriptCategories = chosenChar.getScriptCategories()
      chosenChar.addAboutUserToMessages(scriptCategories, currentScriptCategory)
    }

    let charMessages = chosenChar.getScriptMessages(currentScriptCategory)

    //Part when character wants to save new word in his memory
    if (memory.getIsListening()) {
      userMessage = chosenChar.setUpperLetter(userMessage)
      chosenChar.addToMemoryAboutUser(currentScriptCategory, userMessage)

      if (
        currentScriptCategory === categories.origin ||
        currentScriptCategory === categories.hobby
      ) {
        chosenChar.addUserMessageToAnswer(userMessage, currentScriptCategory, {
          place: 'start',
          where: answerVariants.addedToMemory,
        })
      } else {
        console.log('Jestem poza origin i dodaje na koncu')
        chosenChar.addUserMessageToAnswer(userMessage, currentScriptCategory, {
          place: 'end',
          where: answerVariants.addedToMemory,
        })
      }
      charMessages = chosenChar.getScriptAnswers(currentScriptCategory, {
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
          currentScriptCategory,
          userMessage
        )

        if (elementFromMemory) {
          chosenChar.addToMemoryAboutUser(
            currentScriptCategory,
            elementFromMemory
          )
          if (
            currentScriptCategory === categories.origin ||
            currentScriptCategory === categories.hobby
          ) {
            chosenChar.addUserMessageToAnswer(
              elementFromMemory,
              currentScriptCategory,
              {
                place: 'start',
                where: answerVariants.isInMemory,
              }
            )
          } else {
            chosenChar.addUserMessageToAnswer(
              elementFromMemory,
              currentScriptCategory,
              {
                place: 'end',
                where: answerVariants.isInMemory,
              }
            )
          }

          charMessages = chosenChar.getScriptAnswers(currentScriptCategory, {
            from: answerVariants.isInMemory,
          })
          memory.setUserMessage('')
          memory.setIsCallAgain(true)
        } else {
          charMessages = chosenChar.getScriptAnswers(currentScriptCategory, {
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

      const messageContainer = screen.createMessageContainer(chosenChar.name)
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
