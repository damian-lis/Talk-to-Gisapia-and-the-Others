import { runElementsFn, addNewClassesFn } from './helpers/index.js'
import {
  charNameList,
  answerTypes,
  animationSettings,
  messages,
  answers,
  noConnectionMessage,
  withoutMailMessage,
  mailEndPoint,
  classReferences,
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
    classReferences.selectCharUI.main
  )
  const charsFactory = new CharsFactory()
  const messengerInterface = new MessengerInterface(
    classReferences.messenger.interfaceContainer
  )
  const messengerScreen = new MessengerScreen(
    classReferences.messenger.screenContainer
  )

  const handleCharSelect = (charName) => {
    const chosenChar = charsFactory.getChar(charName)
    memory.setSelectedChar(chosenChar)
  }

  const isCharSelected = () => {
    if (!memory.getChar()) {
      alert('Wybierz rozmówcę!')
      return false
    }
    return true
  }

  const initialAnimation = () => {
    runElementsFn([
      {
        element: classReferences.selectCharUI.main,
        animation: animationSettings.selectCharUI.start,
      },
      {
        element: classReferences.messenger.main,
        animation: animationSettings.messenger.start,
      },
    ])
  }

  const finishAnimation = (variant) => {
    return setTimeout(() => {
      runElementsFn([
        {
          element: classReferences.selectCharUI.main,
          animation: animationSettings.selectCharUI.end,
        },
        {
          element: classReferences.messenger.main,
          animation: animationSettings.messenger.end,
        },
      ])
      return selectCharUi.showFinishMessages(variant)
    }, 2000)
  }

  const customizeMessenger = () => {
    const chosenChar = memory.getChar()

    addNewClassesFn([
      {
        element: classReferences.messenger.main,
        newClasses: [`${chosenChar.name}-main`],
      },
      {
        element: classReferences.messenger.screenContainer,
        newClasses: [`${chosenChar.name}-second`],
      },

      {
        element: classReferences.messenger.interfaceInput,
        newClasses: [`${chosenChar.name}-second`],
      },
      {
        element: classReferences.messenger.interfaceBtn,
        newClasses: [`${chosenChar.name}-second`],
      },
    ])
  }

  const handleCharSendData = async (data) => {
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

  const handleStartCharTalking = () => {
    if (!isCharSelected()) return
    customizeMessenger()
    initialAnimation()
    handleCharTalkingProcess()
  }

  const handleCharMessageSelection = ({
    userMessage,
    chosenChar,
    currentScriptTalkCategory,
    memory,
  }) => {
    let scriptTalkMessages
    if (userMessage) {
      const foundWordInCharMemory = chosenChar.checkUserMessageInMemory(
        currentScriptTalkCategory,
        userMessage
      )
      if (memory.getIsCharListening()) {
        scriptTalkMessages = handleCharMessageAndMemoryShaping({
          chosenChar,
          currentScriptTalkCategory,
          shaping: true,
          wordToMemory: userMessage,
          from: answers,
          answerType: answerTypes.isAddedToMemory,
        })

        memory.setUserMessage('')
        memory.setIsCallCharTalkingAgain(true)
        memory.setIsCharListening(false)
      } else if (foundWordInCharMemory) {
        scriptTalkMessages = handleCharMessageAndMemoryShaping({
          chosenChar,
          currentScriptTalkCategory,
          shaping: true,
          wordToMemory: foundWordInCharMemory,
          from: answers,
          answerType: answerTypes.isInMemory,
        })
        memory.setUserMessage('')
        memory.setIsCallCharTalkingAgain(true)
      } else {
        scriptTalkMessages = handleCharMessageAndMemoryShaping({
          chosenChar,
          currentScriptTalkCategory,
          shaping: false,
          from: answers,
          answerType: answerTypes.isNotInMemory,
        })
        memory.setIsCharListening(true)
      }
    } else {
      scriptTalkMessages = handleCharMessageAndMemoryShaping({
        chosenChar,
        currentScriptTalkCategory,
        shaping: false,
        from: messages,
      })
    }

    return scriptTalkMessages
  }

  const handleCharMessageAndMemoryShaping = ({
    shaping,
    chosenChar,
    currentScriptTalkCategory,
    wordToMemory,
    from,
    answerType,
  }) => {
    if (shaping) {
      chosenChar.addToMemoryAboutUser(currentScriptTalkCategory, wordToMemory)
      chosenChar.changeScriptTalkMessages({
        from,
        type: answerType,
        category: currentScriptTalkCategory,
      })
    } else {
      if (from === 'messages') {
        chosenChar.changeScriptTalkMessages({
          from,
          category: currentScriptTalkCategory,
        })
      } else {
        chosenChar.changeScriptTalkMessages({
          from,
          category: currentScriptTalkCategory,
          type: answerType,
        })
      }
    }

    return chosenChar.getScriptTalkMessages({
      from,
      type: answerType,
      category: currentScriptTalkCategory,
    })
  }

  const handleCharTyping = async ({
    chosenChar,
    scriptTalkMessages,
    messengerScreen,
  }) => {
    for (let i = 0; i < scriptTalkMessages.length; i++) {
      const charMessage = scriptTalkMessages[i]
      let timeForTyping = chosenChar.countTimeForTyping(charMessage.length, 80)
      const typingQuantity = chosenChar.countTypingQuantity(charMessage.length)

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          timeForTyping = chosenChar.changeTimeForTyping(timeForTyping)
        }

        await chosenChar.mustThink(1000)
        await messengerScreen.showTyping(timeForTyping, chosenChar.name)
      }

      const chatBubble = messengerScreen.createChatBubble(
        charMessage,
        chosenChar
      )
      messengerScreen.attachToMessengerScreen(chatBubble)
      messengerScreen.scrollMessengerScreenContainer()
    }
  }

  const handleFinishCharTalking = async ({ userMessage, chosenChar }) => {
    if (userMessage.includes('@')) {
      const data = {
        senderName: chosenChar.name,
        recipientMail: userMessage,
        ...chosenChar.getMemoryAboutUser(),
      }
      return await handleCharSendData(data)
    } else {
      return finishAnimation(withoutMailMessage)
    }
  }

  const handleCharTalkingProcess = async () => {
    const chosenChar = memory.getChar()
    const talkingStep = memory.getTalkingStep()
    const currentScriptTalkCategory = chosenChar.getCurrentScriptTalkCategory(
      talkingStep
    )
    const scriptTalkCategories = chosenChar.getScriptTalkCategories()
    let userMessage = memory.getUserMessage()

    if (memory.getIsCharTalkingFinish()) {
      return await handleFinishCharTalking({ userMessage, chosenChar })
    }

    const scriptTalkMessages = handleCharMessageSelection({
      userMessage,
      chosenChar,
      currentScriptTalkCategory,
      memory,
    })

    await handleCharTyping({
      chosenChar,
      scriptTalkMessages,
      messengerScreen,
    })

    if (currentScriptTalkCategory === scriptTalkCategories.summary) {
      memory.setIsCharTalkingFinish(true)
    }

    if (memory.getIsCallCharTalkingAgain()) {
      memory.setIsCallCharTalkingAgain(false)
      memory.increaseTalkingStep()
      handleCharTalkingProcess()
    } else {
      messengerInterface.activatePanel()
    }
  }

  const handleUserTalkingProcess = (userMessage) => {
    const chatBubble = messengerScreen.createChatBubble(userMessage, {
      name: 'user',
    })

    memory.setUserMessage(userMessage)
    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreenContainer()
    messengerScreen.increaseCharMessagesPart()
    messengerInterface.deactivatePanel()
    handleCharTalkingProcess()
  }

  messengerInterface.subscribe(handleUserTalkingProcess)
  selectCharUi.subscribe(handleCharSelect, 'selectChar')
  selectCharUi.subscribe(handleStartCharTalking, 'startTalking')
})
