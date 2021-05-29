import {
  common,
  events,
  answerTypes,
  commands,
  messages,
  charNameList,
  mailEndPoint,
  ideReferences,
  fetchProps,
  animationSettings,
  toggleValue,
  subscriberNames,
} from '/data/names.js'
import {
  memory,
  SelectCharUI,
  CharsFactory,
  Messenger,
  MessengerInterface,
  MessengerScreen,
} from '/scripts/objects/index.js'

document.addEventListener(events.DOMContentLoaded, () => {
  const charsFactory = new CharsFactory({ objects: { memory } })
  const selectCharUI = new SelectCharUI({
    container: ideReferences.global.app,
    charNames: charNameList,
    objects: { memory },
  })
  const messenger = new Messenger({ container: ideReferences.global.app })
  const messengerInterface = new MessengerInterface({
    container: messenger,
    objects: { memory },
  })
  const messengerScreen = new MessengerScreen({
    container: messenger,
    objects: {
      selectCharUI,
      messengerInterface,
      memory,
    },
  })

  const handleCharSelect = (charName) => {
    const chosenChar = charsFactory.getChar(charName)
    memory.setSelectedChar(chosenChar)
    selectCharUI.toggleReadyStartCharTalkingBtn(toggleValue.on)
  }

  const handleCharTalkingStart = () => {
    if (!isCharSelected()) return
    handleInitialSettings()
    handleInitialAnimation()
    handleCharTalkingMain()
  }

  const isCharSelected = () => {
    if (!memory.getChar()) {
      const lng = memory.getLanguage()
      alert(commands.chooseCharacter[lng])
      return false
    }
    return true
  }

  const handleInitialSettings = () => {
    const chosenChar = memory.getChar()
    memory.deleteDataAboutUser()
    chosenChar.setScriptTalk()
    messenger.changeColor({ char: chosenChar })
    messengerScreen.changeColor({ char: chosenChar })
    messengerScreen.removeChatBubbles()
    messengerInterface.changeColor({ char: chosenChar })
  }

  const handleInitialAnimation = () => {
    selectCharUI.move({
      type: animationSettings.selectCharUI.toBottomHide,
    })
    messenger.move({ type: animationSettings.messenger.fallFromTop })
  }

  const handleCharTalkingMain = async () => {
    const chosenChar = memory.getChar()
    const talkingStep = memory.getTalkingStep()
    const currentScriptTalkCategory = chosenChar.getCurrentScriptTalkCategory({
      conversationStep: talkingStep,
    })
    const scriptTalkCategories = chosenChar.getScriptTalkCategories()
    let userMessage = memory.getUserMessage()

    if (memory.getIsCharTalkingFinish())
      return await handleCharTalkingFinish({ userMessage, chosenChar })

    let scriptTalkMessages

    if (userMessage) {
      const foundWordInCharMemory = chosenChar.checkUserMessageInMemory({
        scriptCategory: currentScriptTalkCategory,
        message: userMessage,
      })
      if (foundWordInCharMemory) {
        handleCharTalkingWhenCharFoundWord({
          chosenChar,
          currentScriptTalkCategory,
          memory,
          foundWordInCharMemory,
        })
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: common.answers,
          type: answerTypes.isInMemory,
          category: currentScriptTalkCategory,
        })
      } else if (memory.getIsCharListening()) {
        handleCharTalkingDuringCharListening({
          chosenChar,
          currentScriptTalkCategory,
          memory,
          userMessage,
        })
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: common.answers,
          type: answerTypes.isAddedToMemory,
          category: currentScriptTalkCategory,
        })
      } else {
        handleCharTalkingWhenCharNotFoundWord({
          chosenChar,
          currentScriptTalkCategory,
          memory,
        })
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: common.answers,
          type: answerTypes.isNotInMemory,
          category: currentScriptTalkCategory,
        })
      }
    } else {
      handleCharTalkingWithoutUserMessage({
        chosenChar,
        currentScriptTalkCategory,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.messages,
        category: currentScriptTalkCategory,
      })
    }

    await handleCharTalkingDuringCharTyping({
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
      handleCharTalkingMain()
    } else {
      messengerInterface.toggleActivePanel(toggleValue.on)
      messengerScreen.toggleShowBackIcon(toggleValue.on)
    }
  }

  const handleCharTalkingDuringCharListening = ({
    chosenChar,
    currentScriptTalkCategory,
    memory,
    userMessage,
  }) => {
    memory.setUserMessage('')
    memory.setIsCallCharTalkingAgain(true)
    memory.setIsCharListening(false)
    memory.addDataToAboutUser({
      scriptCategory: currentScriptTalkCategory,
      word: userMessage,
    })
    chosenChar.changeScriptTalkMessages({
      from: common.answers,
      type: answerTypes.isAddedToMemory,
      category: currentScriptTalkCategory,
    })
  }

  const handleCharTalkingWhenCharFoundWord = ({
    chosenChar,
    currentScriptTalkCategory,
    memory,
    foundWordInCharMemory,
  }) => {
    memory.setUserMessage('')
    memory.setIsCallCharTalkingAgain(true)
    memory.addDataToAboutUser({
      scriptCategory: currentScriptTalkCategory,
      word: foundWordInCharMemory,
    })
    chosenChar.changeScriptTalkMessages({
      from: common.answers,
      type: answerTypes.isInMemory,
      category: currentScriptTalkCategory,
    })
  }

  const handleCharTalkingWhenCharNotFoundWord = ({
    chosenChar,
    currentScriptTalkCategory,
    memory,
  }) => {
    memory.setIsCharListening(true)
    chosenChar.changeScriptTalkMessages({
      from: common.answers,
      category: currentScriptTalkCategory,
      type: answerTypes.isNotInMemory,
    })
  }

  const handleCharTalkingWithoutUserMessage = ({
    chosenChar,
    currentScriptTalkCategory,
  }) => {
    chosenChar.changeScriptTalkMessages({
      from: common.messages,
      category: currentScriptTalkCategory,
    })
  }

  const handleCharTalkingDuringCharTyping = async ({
    chosenChar,
    scriptTalkMessages,
    messengerScreen,
  }) => {
    for (let i = 0; i < scriptTalkMessages.length; i++) {
      const charMessage = scriptTalkMessages[i]
      let timeForTyping = chosenChar.countTimeForTyping({
        messageLength: charMessage.length,
        speed: 80,
      })
      const typingQuantity = chosenChar.countTypingQuantity({
        messageLength: charMessage.length,
      })

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          timeForTyping = chosenChar.changeTimeForTyping(timeForTyping)
        }

        await chosenChar.mustThink({ time: 1000 })
        await messengerScreen.showTyping({
          time: timeForTyping,
          charName: chosenChar.name,
        })
      }

      const chatBubble = messengerScreen.createChatBubbleComponent({
        message: charMessage,
        whoTalking: chosenChar,
      })

      messengerScreen.attachToMessengerScreen(chatBubble)
      messengerScreen.scrollMessengerScreen()
    }
  }

  const handleCharTalkingFinish = async ({ userMessage, chosenChar }) => {
    let messageToSend
    let delayToSend

    if (userMessage.includes('@')) {
      messengerInterface.showSpinnerInsteadBtn()
      messengerInterface.addDelayMessagesToInput({
        delay: 5000,
      })
      const lng = memory.getLanguage()
      chosenChar.addUserDataToEmail({
        lng,
        recipient: userMessage,
      })
      const charEmail = chosenChar.getEmail()

      const { message, delay } = await handleCharTalkingDuringSendData({
        data: charEmail,
      })
      messageToSend = message
      delayToSend = delay
      messengerInterface.clearInput({ withTimeouts: true })
      messengerInterface.showSpinnerInsteadBtn({ invert: true })
    } else {
      messageToSend = messages.finish.withoutMail
      delayToSend = 1000
    }

    handleFinishAnimation({ delay: delayToSend })
    selectCharUI.changeUI({ message: messageToSend })
  }

  const handleCharTalkingDuringSendData = async ({ data }) => {
    return await fetch(mailEndPoint, {
      method: fetchProps.methods.POST,
      headers: {
        [fetchProps.headers.props.ContentType]:
          fetchProps.headers.values.applicationJson,
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        data.success
          ? { message: messages.finish.mailSent, delay: 0 }
          : { message: messages.finish.problemWithServer, delay: 1000 }
      )
      .catch(() => {
        return { message: messages.finish.noConnection, delay: 1000 }
      })
  }

  const handleFinishAnimation = ({ delay } = 0) => {
    return setTimeout(() => {
      selectCharUI.move({ type: animationSettings.selectCharUI.fromBottomShow })
      messenger.move({ type: animationSettings.messenger.backToTheTop })
      memory.playFallDownAudio()
      memory.playFinishAudio()
      memory.playBackgroundAudio({ pause: true })
    }, delay)
  }

  const handleUserTalking = (userMessage) => {
    const chatBubble = messengerScreen.createChatBubbleComponent({
      message: userMessage,
      whoTalking: { name: common.user },
    })
    memory.setUserMessage(userMessage)
    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreen()
    messengerScreen.increaseCharMessagesPart()
    messengerScreen.toggleShowBackIcon(toggleValue.off)
    messengerInterface.toggleActivePanel(toggleValue.off)
    handleCharTalkingMain()
  }

  selectCharUI.subscribe({
    subscriber: handleCharSelect,
    subscriberName: subscriberNames.selectChar,
  })
  selectCharUI.subscribe({
    subscriber: handleCharTalkingStart,
    subscriberName: subscriberNames.startTalking,
  })
  messengerInterface.subscribe({ subscriber: handleUserTalking })
})
