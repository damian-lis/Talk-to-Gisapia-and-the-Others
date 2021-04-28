import { GisapiaAnimation, Background } from './index.js'
import { createElementFn } from '/scripts/helpers/index.js'
import { src, categories } from '/data/global/names.js'

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.talkingStep = 0
      this.character = null
      this.aboutUser = {}
      this.userMessage = null
      this.isCallCharTalkingAgain = false
      this.isCharListening = false
      this.isCharTalkingFinish = false
      this.backgroundAnimation = this.background()
      this.gisapiaAnimation = this.gisapiaAnimation()
      this.language = localStorage.getItem('language') || 'pl'
      this.lngSubscribers = []
      this.createAudio()
      Memory.instance = this
    }
    return Memory.instance
  }

  createAudio() {
    this.typingAudio = createElementFn({
      element: 'audio',
      src: src.audio.typing,
    })

    this.chatBubbleAudio = createElementFn({
      element: 'audio',
      src: src.audio.chatBubble,
    })

    this.fallDownAudio = createElementFn({
      element: 'audio',
      src: src.audio.throw,
    })

    this.backgroundAudio = createElementFn({
      element: 'audio',
      src: src.audio.background,
    })

    this.finishAudio = createElementFn({
      element: 'audio',
      src: src.audio.finish,
    })

    this.clickAudio = createElementFn({
      element: 'audio',
      src: src.audio.click,
    })
  }

  playClickAudio() {
    this.clickAudio.play()
  }

  playTypingAudio() {
    this.typingAudio.play()
  }

  playChatBubbleAudio() {
    this.chatBubbleAudio.play()
  }

  playFallDownAudio() {
    this.fallDownAudio.play()
  }

  playBackgroundAudio({ pause, reload } = false) {
    if (reload) {
      this.backgroundAudio.load()
    }

    if (pause) {
      this.backgroundAudio.pause()
    } else {
      this.backgroundAudio.play()
    }
  }

  playFinishAudio({ pause, reload } = false) {
    if (reload) {
      this.finishAudio.load()
    }
    if (pause) {
      this.finishAudio.pause()
    } else {
      this.finishAudio.play()
    }
  }

  background() {
    new Background()
  }

  gisapiaAnimation() {
    new GisapiaAnimation()
  }

  setUpperLetter(message) {
    return message.charAt(0).toUpperCase() + message.slice(1)
  }

  addDataToAboutUser(scriptCategory, word) {
    if (scriptCategory !== categories.hobby) {
      word = this.setUpperLetter(word)
    }
    this.aboutUser[scriptCategory] = word
  }

  getAboutUser() {
    return this.aboutUser
  }

  deleteDataAboutUser() {
    this.aboutUser = {}
  }

  increaseTalkingStep() {
    this.talkingStep++
  }

  getTalkingStep() {
    return this.talkingStep
  }

  setSelectedChar(character) {
    this.character = character
  }

  getChar() {
    return this.character
  }

  setUserMessage(message) {
    this.userMessage = message
  }

  getUserMessage() {
    return this.userMessage
  }

  setIsCallCharTalkingAgain(value) {
    this.isCallCharTalkingAgain = value
  }

  getIsCallCharTalkingAgain() {
    return this.isCallCharTalkingAgain
  }

  setIsCharListening(value) {
    this.isCharListening = value
  }

  getIsCharListening() {
    return this.isCharListening
  }

  setIsCharTalkingFinish(value) {
    this.isCharTalkingFinish = value
  }

  getIsCharTalkingFinish() {
    return this.isCharTalkingFinish
  }

  setLanguage(lng) {
    this.language = lng
    localStorage.setItem('language', lng)
  }

  getLanguage() {
    return this.language
  }

  lngSubscribe(cb) {
    this.lngSubscribers.push(cb)
  }

  changeLanguage() {
    this.lngSubscribers.map((cb) => {
      cb(this.language)
    })
  }

  restart() {
    this.talkingStep = 0
    this.character = null
    this.userMessage = null
    this.isCallCharTalkingAgain = false
    this.isCharListening = false
    this.isCharTalkingFinish = false
  }
}

const memory = new Memory()

export default memory
