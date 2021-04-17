import { runElementsFn, setClassesFn } from '/scripts/helpers/index.js'
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
  classNames,
} from '/data/global/names.js'
import {
  memory,
  SelectCharUI,
  CharsFactory,
  MessengerInterface,
  MessengerScreen,
} from '/scripts/objects/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const selectCharUI = new SelectCharUI(
    charNameList,
    classReferences.selectCharUI.main,
    memory
  )
  const charsFactory = new CharsFactory()
  const messengerInterface = new MessengerInterface(
    classReferences.messenger.interfaceContainer
  )
  const messengerScreen = new MessengerScreen(
    classReferences.messenger.screenContainer,
    memory,
    selectCharUI
  )

  const handleCharSelect = (charName) => {
    const chosenChar = charsFactory.getChar(charName)
    memory.restart()
    memory.setSelectedChar(chosenChar)
    selectCharUI.toggleStartCharTalkingBtn('on')
  }

  const handleStartCharTalking = () => {
    if (!isCharSelected()) return
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
      handleCharTalking()
    } else {
      messengerInterface.activatePanel()
      messengerScreen.activateBackBtn()
    }
  }

  const handleFinishCharTalking = async ({ userMessage, chosenChar }) => {
    if (userMessage.includes('@')) {
      const data = {
        senderName: chosenChar.name,
        recipientMail: userMessage,
        ...chosenChar.getMemoryAboutUser(),
      }
      messengerInterface.showSpinnerInsteadBtn()
      messengerInterface.addWaitTextToInput()
      await handleCharSendData(data)
      messengerInterface.clearInput()
      messengerInterface.showBtnInsteadSpinner()
    } else {
      finishAnimation(withoutMailMessage, 1000)
    }
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
        finishAnimation(noConnectionMessage, 1000)
      })
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

  const finishAnimation = (variant, delay) => {
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
      return selectCharUI.showFinishMessages(variant)
    }, delay)
  }

  const customizeMessenger = () => {
    const chosenChar = memory.getChar()
    messengerScreen.removeChatBubbles()

    setClassesFn([
      {
        element: classNames.messenger.main,
        classes: [`${chosenChar.name.toLowerCase()}-main`],
      },
      {
        element: classNames.messenger.screenContainer,
        classes: [`${chosenChar.name.toLowerCase()}-second`],
      },

      {
        element: classNames.messenger.interfaceInput,
        classes: [`${chosenChar.name.toLowerCase()}-second`],
      },
      {
        element: classNames.messenger.interfaceBtn,
        classes: [`${chosenChar.name.toLowerCase()}-second`],
      },
      {
        element: 'messenger-spinner-container',
        classes: [`${chosenChar.name.toLowerCase()}-second`],
      },
      {
        element: 'messenger-back-icon',
        classes: [`${chosenChar.name.toLowerCase()}-main`],
      },
    ])
  }

  selectCharUI.subscribe(handleCharSelect, 'selectChar')
  selectCharUI.subscribe(handleStartCharTalking, 'startTalking')

  const handleUserTalking = (userMessage) => {
    const chatBubble = messengerScreen.createChatBubble(userMessage, {
      name: 'user',
    })
    memory.setUserMessage(userMessage)
    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreenContainer()
    messengerScreen.increaseCharMessagesPart()
    messengerScreen.deactivateBackBtn()
    messengerInterface.deactivatePanel()
    handleCharTalking()
  }

  messengerInterface.subscribe(handleUserTalking)
})
