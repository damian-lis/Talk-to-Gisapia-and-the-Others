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
  const charsFactory = new CharsFactory(memory)
  const selectCharUI = new SelectCharUI(
    charNameList,
    ideReferences.global.app,
    memory
  )
  const messenger = new Messenger(ideReferences.global.app)
  const messengerInterface = new MessengerInterface(messenger, memory)
  const messengerScreen = new MessengerScreen(
    messenger,
    selectCharUI,
    messengerInterface,
    memory
  )

  const handleCharSelect = (charName) => {
    const chosenChar = charsFactory.getChar(charName)
    memory.setSelectedChar(chosenChar)
    selectCharUI.toggleReadyStartCharTalkingBtn(common.on)
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
    messenger.changeColor(chosenChar)
    messengerScreen.changeColor(chosenChar)
    messengerScreen.removeChatBubbles()
    messengerInterface.changeColor(chosenChar)
  }

  const handleInitialAnimation = () => {
    selectCharUI.move({ type: common.toBottomHide })
    messenger.move({ type: common.fallFromTop })
  }

  const handleCharTalkingMain = async () => {
    const chosenChar = memory.getChar()
    const talkingStep = memory.getTalkingStep()
    const currentScriptTalkCategory = chosenChar.getCurrentScriptTalkCategory(
      talkingStep
    )
    const scriptTalkCategories = chosenChar.getScriptTalkCategories()
    let userMessage = memory.getUserMessage()

    if (memory.getIsCharTalkingFinish()) {
      return await handleCharTalkingFinish({ userMessage, chosenChar })
    }

    let scriptTalkMessages

    if (userMessage) {
      const foundWordInCharMemory = chosenChar.checkUserMessageInMemory(
        currentScriptTalkCategory,
        userMessage
      )
      if (foundWordInCharMemory) {
        handleCharTalkingWhenCharFoundWord(
          chosenChar,
          currentScriptTalkCategory,
          memory,
          foundWordInCharMemory
        )
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: common.answers,
          type: answerTypes.isInMemory,
          category: currentScriptTalkCategory,
        })
      } else if (memory.getIsCharListening()) {
        handleCharTalkingDuringCharListening(
          chosenChar,
          currentScriptTalkCategory,
          memory,
          userMessage
        )
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: common.answers,
          type: answerTypes.isAddedToMemory,
          category: currentScriptTalkCategory,
        })
      } else {
        handleCharTalkingWhenCharNotFoundWord(
          chosenChar,
          currentScriptTalkCategory,
          memory
        )
        scriptTalkMessages = chosenChar.getScriptTalkMessages({
          from: common.answers,
          type: answerTypes.isNotInMemory,
          category: currentScriptTalkCategory,
        })
      }
    } else {
      handleCharTalkingWithoutUserMessage(chosenChar, currentScriptTalkCategory)
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
      messengerInterface.toggleActivePanel(common.on)
      messengerScreen.toggleShowBackBtn(common.on)
    }
  }

  const handleCharTalkingDuringCharListening = (
    chosenChar,
    currentScriptTalkCategory,
    memory,
    userMessage
  ) => {
    memory.setUserMessage('')
    memory.setIsCallCharTalkingAgain(true)
    memory.setIsCharListening(false)
    memory.addDataToAboutUser(currentScriptTalkCategory, userMessage)
    chosenChar.changeScriptTalkMessages({
      from: common.answers,
      type: answerTypes.isAddedToMemory,
      category: currentScriptTalkCategory,
    })
  }

  const handleCharTalkingWhenCharFoundWord = (
    chosenChar,
    currentScriptTalkCategory,
    memory,
    foundWordInCharMemory
  ) => {
    memory.setUserMessage('')
    memory.setIsCallCharTalkingAgain(true)
    memory.addDataToAboutUser(currentScriptTalkCategory, foundWordInCharMemory)
    chosenChar.changeScriptTalkMessages({
      from: common.answers,
      type: answerTypes.isInMemory,
      category: currentScriptTalkCategory,
    })
  }

  const handleCharTalkingWhenCharNotFoundWord = (
    chosenChar,
    currentScriptTalkCategory,
    memory
  ) => {
    memory.setIsCharListening(true)
    chosenChar.changeScriptTalkMessages({
      from: common.answers,
      category: currentScriptTalkCategory,
      type: answerTypes.isNotInMemory,
    })
  }

  const handleCharTalkingWithoutUserMessage = (
    chosenChar,
    currentScriptTalkCategory
  ) => {
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
      let timeForTyping = chosenChar.countTimeForTyping(charMessage.length, 80)
      const typingQuantity = chosenChar.countTypingQuantity(charMessage.length)

      for (let i = 0; i < typingQuantity; i++) {
        if (i >= 1) {
          timeForTyping = chosenChar.changeTimeForTyping(timeForTyping)
        }

        // await chosenChar.mustThink(1000)
        // await messengerScreen.showTyping(timeForTyping, chosenChar.name)
      }

      const chatBubble = messengerScreen.createChatBubbleComponent(
        charMessage,
        chosenChar
      )

      messengerScreen.attachToMessengerScreen(chatBubble)
      messengerScreen.scrollMessengerScreen()
    }
  }

  const handleCharTalkingFinish = async ({ userMessage, chosenChar }) => {
    if (userMessage.includes('@')) {
      messengerInterface.showSpinnerInsteadBtn()
      messengerInterface.addWaitMessagesToInput({
        firstDelay: 4000,
        secondDelay: 12000,
        thirdDelay: 18000,
      })
      const lng = memory.getLanguage()
      chosenChar.addUserDataToEmail({
        lng,
        recipient: userMessage,
      })
      const charEmail = chosenChar.getEmail()

      await handleCharTalkingDuringSendData(charEmail)
      messengerInterface.clearInput({ withTimeouts: true })
      messengerInterface.showSpinnerInsteadBtn({ invert: true })
    } else {
      handleFinishAnimation({ delay: 1000 })
      selectCharUI.changeUI({ messages: messages.withoutMail })
    }
  }

  const handleCharTalkingDuringSendData = async (data) => {
    return await fetch(mailEndPoint, {
      method: fetchProps.methods.POST,
      headers: {
        [fetchProps.headers.props.ContentType]:
          fetchProps.headers.values.applicationJson,
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          handleFinishAnimation()
          selectCharUI.changeUI({ messages: messages.mailSent })
        } else {
          handleFinishAnimation({ delay: 1000 })
          selectCharUI.changeUI({ messages: messages.problemWithServer })
        }
      })
      .catch(() => {
        selectCharUI.changeUI({ messages: messages.noConnection })
        handleFinishAnimation({ delay: 1000 })
      })
  }

  const handleFinishAnimation = ({ delay } = 0) => {
    return setTimeout(() => {
      selectCharUI.move({ type: common.fromBottomShow })
      messenger.move({ type: common.backToTheTop })
      memory.playFallDownAudio()
      memory.playFinishAudio()
      memory.playBackgroundAudio({ pause: true })
    }, delay)
  }

  const handleUserTalking = (userMessage) => {
    const chatBubble = messengerScreen.createChatBubbleComponent(userMessage, {
      name: common.user,
    })
    memory.setUserMessage(userMessage)
    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreen()
    messengerScreen.increaseCharMessagesPart()
    messengerScreen.toggleShowBackBtn(common.off)
    messengerInterface.toggleActivePanel(common.off)
    handleCharTalkingMain()
  }

  selectCharUI.subscribe(handleCharSelect, common.selectChar)
  selectCharUI.subscribe(handleCharTalkingStart, common.startTalking)
  messengerInterface.subscribe(handleUserTalking)
})
