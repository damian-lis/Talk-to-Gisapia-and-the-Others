import { runElements, addNewClasses } from './helpers/index.js'
import {
  charNameList,
  answerTypes,
  animationSettings,
  elementsByClass,
  messages,
  answers,
  noConnectionMessage,
  withoutMailMessage,
  mailEndPoint,
} from '../data/globalNames.js'
import {
  memory,
  SelectCharUI,
  CharsFactory,
  MessengerInterface,
  MessengerScreen,
} from './objects/index.js'

document.addEventListener('DOMContentLoaded', function () {
  const selectCharUi = new SelectCharUI(
    charNameList,
    elementsByClass.selectCharUI
  )
  const charsFactory = new CharsFactory()
  const messengerInterface = new MessengerInterface(
    elementsByClass.messengerInterface
  )
  const messengerScreen = new MessengerScreen(elementsByClass.messengerScreen)

  const handleSelectChar = (charName) => {
    const chosenChar = charsFactory.getChar(charName)
    memory.setSelectedChar(chosenChar)
  }

  const isSelectedChar = () => {
    const chosenChar = memory.getChar()

    if (!chosenChar) {
      alert('Wybierz rozmówcę!')
      return false
    }
    return true
  }

  const initialAnimation = () => {
    runElements([
      {
        element: elementsByClass.selectCharUI,
        animation: animationSettings.selectCharUI.start,
      },
      {
        element: elementsByClass.messenger,
        animation: animationSettings.messenger.start,
      },
    ])
  }

  const finishAnimation = (variant) => {
    return setTimeout(() => {
      runElements([
        {
          element: elementsByClass.selectCharUI,
          animation: animationSettings.selectCharUI.end,
        },
        {
          element: elementsByClass.messenger,
          animation: animationSettings.messenger.end,
        },
      ])
      return selectCharUi.showFinishMessages(variant)
    }, 2000)
  }

  const customizeMessenger = () => {
    const chosenChar = memory.getChar()

    addNewClasses([
      {
        element: elementsByClass.messenger,
        newClasses: [`${chosenChar.name}-main`],
      },
      {
        element: elementsByClass.screen,
        newClasses: [`${chosenChar.name}-second`],
      },

      {
        element: elementsByClass.interfaceInput,
        newClasses: [`${chosenChar.name}-second`],
      },
      {
        element: elementsByClass.interfaceBtn,
        newClasses: [`${chosenChar.name}-second`],
      },
    ])
  }

  const handleSendData = async (data) => {
    return await fetch(mailEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          finishAnimation(data.message)
        } else {
          finishAnimation(data.message)
        }
      })
      .catch(() => {
        finishAnimation(noConnectionMessage)
      })
  }

  const startTalking = () => {
    if (!isSelectedChar()) return
    customizeMessenger()
    initialAnimation()
    handleCharTalking()
  }

  const handleCharTalking = async () => {
    const chosenChar = memory.getChar()
    const talkingStep = memory.getTalkingStep()
    const currentScriptTalkCategory = chosenChar.getCurrentScriptTalkCategory(
      talkingStep
    )
    const scriptTalkCategories = chosenChar.getScriptTalkCategories()
    let userMessage = memory.getUserMessage()
    let scriptTalkMessages

    if (memory.getIsCharTalkingFinish()) {
      if (userMessage.includes('@')) {
        const data = {
          senderName: chosenChar.name,
          recipientMail: userMessage,
          ...chosenChar.getMemoryAboutUser(),
        }
        return await handleSendData(data)
      } else {
        return finishAnimation(withoutMailMessage)
      }
    }

    if (userMessage) {
      const foundWordInCharMemory = chosenChar.checkUserMessageInMemory(
        currentScriptTalkCategory,
        userMessage
      )
      if (memory.getIsCharListening()) {
        chosenChar.addToMemoryAboutUser(currentScriptTalkCategory, userMessage)
        chosenChar.changeScriptTalkMessages({
          from: answers,
          type: answerTypes.isAddedToMemory,
          category: currentScriptTalkCategory,
        })
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: answers,
          type: answerTypes.isAddedToMemory,
          category: currentScriptTalkCategory,
        })

        memory.setUserMessage('')
        memory.setIsCallCharTalkingAgain(true)
        memory.setIsCharListening(false)
      } else if (foundWordInCharMemory) {
        chosenChar.addToMemoryAboutUser(
          currentScriptTalkCategory,
          foundWordInCharMemory
        )
        chosenChar.changeScriptTalkMessages({
          from: answers,
          type: answerTypes.isInMemory,
          category: currentScriptTalkCategory,
        })
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: answers,
          type: answerTypes.isInMemory,
          category: currentScriptTalkCategory,
        })
        memory.setUserMessage('')
        memory.setIsCallCharTalkingAgain(true)
      } else {
        chosenChar.changeScriptTalkMessages({
          from: answers,
          type: answerTypes.isNotInMemory,
          category: currentScriptTalkCategory,
        })
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: answers,
          type: answerTypes.isNotInMemory,
          category: currentScriptTalkCategory,
        })
        memory.setIsCharListening(true)
      }
    } else {
      chosenChar.changeScriptTalkMessages({
        from: messages,
        category: currentScriptTalkCategory,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: messages,
        category: currentScriptTalkCategory,
      })
    }

    //Part about character typing
    for (let i = 0; i < scriptTalkMessages.length; i++) {
      const charMessage = scriptTalkMessages[i]
      let timeForTyping = chosenChar.countTimeForTyping(charMessage.length, 80)
      const typingQuantity = chosenChar.countTypingQuantity(charMessage.length)

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          timeForTyping = chosenChar.changeTimeForTyping(timeForTyping)
        }

        // await chosenChar.mustThink(1000)
        // await messengerScreen.showTyping(timeForTyping, chosenChar.name)
      }

      const chatBubble = messengerScreen.createChatBubble(
        charMessage,
        chosenChar
      )
      messengerScreen.attachToMessengerScreen(chatBubble)
      messengerScreen.scrollMessengerScreenContainer()
    }

    if (currentScriptTalkCategory === scriptTalkCategories.summary) {
      memory.setIsCharTalkingFinish(true)
    }

    if (memory.getIsCallCharTalkingAgain()) {
      memory.setIsCallCharTalkingAgain(false)
      memory.increaseTalkingStep()
      handleCharTalking()
    } else {
      messengerInterface.activatePanel()
    }
  }

  //User talking process
  const handleUserTalking = (userMessage) => {
    const chatBubble = messengerScreen.createChatBubble(userMessage, {
      name: 'user',
    })

    memory.setUserMessage(userMessage)
    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreenContainer()
    messengerScreen.increaseCharMessagesPart()
    messengerInterface.deactivatePanel()
    handleCharTalking()
  }

  messengerInterface.subscribe(handleUserTalking)
  selectCharUi.subscribe(handleSelectChar, 'selectChar')
  selectCharUi.subscribe(startTalking, 'startTalking')
})
