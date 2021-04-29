import { GisapiaAnimation, Background } from './index.js'
import { createElementFn, setUpperLetterFn } from '/scripts/helpers/index.js'
import charMemory from '/data/characters/charMemory.js'
import { src, common } from '/data/main.js'

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.talkingStep = 0
      this.character = null
      this.charMemory = charMemory
      this.aboutUser = {}
      this.userMessage = null
      this.isCallCharTalkingAgain = false
      this.isCharListening = false
      this.isCharTalkingFinish = false
      this.backgroundAnimation = this.background()
      this.gisapiaAnimation = this.gisapiaAnimation()
      this.language =
        localStorage.getItem(common.language.name) || common.language.pl.small
      this.lngSubscribers = []
      this.createAudio()
      Memory.instance = this
    }
    return Memory.instance
  }

  createAudio() {
    this.typingAudio = createElementFn({
      element: common.elements.audio,
      src: src.audio.typing,
    })

    this.chatBubbleAudio = createElementFn({
      element: common.elements.audio,
      src: src.audio.chatBubble,
    })

    this.fallDownAudio = createElementFn({
      element: common.elements.audio,
      src: src.audio.throw,
    })

    this.backgroundAudio = createElementFn({
      element: common.elements.audio,
      src: src.audio.background,
    })

    this.finishAudio = createElementFn({
      element: common.elements.audio,
      src: src.audio.finish,
    })

    this.clickAudio = createElementFn({
      element: common.elements.audio,
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

  getCharMemory(category) {
    return this.charMemory[category]
  }

  addDataToAboutUser(scriptCategory, word) {
    if (scriptCategory !== common.categories.hobby) {
      word = setUpperLetterFn(word)
    }
    this.aboutUser[scriptCategory] = word
  }

  getAboutUser(category) {
    return category ? this.aboutUser[category] : this.aboutUser
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
    localStorage.setItem(common.language.name, lng)
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
