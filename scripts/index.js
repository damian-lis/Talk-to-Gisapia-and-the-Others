import { runElementsFn, setClassesFn } from '/scripts/helpers/index.js'
import {
  charNameList,
  answerTypes,
  animationSettings,
  messages,
  answers,
  noConnectionMessage,
  withoutMailMessage,
  mailSent,
  problemWithServer,
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
  const charsFactory = new CharsFactory(memory)
  const messengerInterface = new MessengerInterface(
    classReferences.messenger.interface,
    memory
  )
  const selectCharUI = new SelectCharUI(
    charNameList,
    classReferences.selectCharUI.main,
    memory
  )
  const messengerScreen = new MessengerScreen(
    classReferences.messenger.screen,
    selectCharUI,
    messengerInterface,
    memory
  )

  const handleCharSelect = (charName) => {
    const chosenChar = charsFactory.getChar(charName)

    memory.setSelectedChar(chosenChar)
    selectCharUI.toggleReadyStartCharTalkingBtn('on')
  }

  const handleStartCharTalking = () => {
    if (!isCharSelected()) return
    initialSettings()
    initialAnimation()
    handleCharTalking()
  }

  const isCharSelected = () => {
    if (!memory.getChar()) {
      alert('Wybierz rozmówcę!')
      return false
    }
    return true
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
      messengerInterface.toggleActivePanel('on')
      messengerScreen.toggleShowBackBtn('on')
    }
  }

  const handleFinishCharTalking = async ({ userMessage, chosenChar }) => {
    if (userMessage.includes('@')) {
      messengerInterface.showSpinnerInsteadBtn()
      messengerInterface.addWaitMessagesToInput({
        firstDelay: 4000,
        secondDelay: 8000,
        thirdDelay: 12000,
      })
      chosenChar.addUserDataToEmail({
        lng: memory.getLanguage(),
        recipient: userMessage,
      })
      const charEmail = chosenChar.getEmail()
      await handleCharSendData(charEmail)
      messengerInterface.clearInput({ withTimeouts: true })
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
          finishAnimation(mailSent)
        } else {
          finishAnimation(problemWithServer)
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

  const initialSettings = () => {
    const chosenChar = memory.getChar()
    chosenChar.deleteMemoryAboutUser()
    chosenChar.setScriptTalk()
    messengerScreen.removeChatBubbles()

    setClassesFn([
      {
        element: classNames.messenger.main,
        classes: [`${chosenChar.name.toLowerCase()}-main`],
      },
      {
        element: classNames.messenger.screen,
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
        element: classNames.messenger.spinnerContainer,
        classes: [`${chosenChar.name.toLowerCase()}-second`],
      },
      {
        element: classNames.messenger.backIcon,
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
    messengerScreen.toggleShowBackBtn('off')
    messengerInterface.toggleActivePanel('off')
    handleCharTalking()
  }

  messengerInterface.subscribe(handleUserTalking)
})
