import { GisapiaAnimation, Background } from './index.js'
import { createElementFn, setUpperLetterFn } from '/scripts/helpers/index.js'
import { charMemory } from '/data/characters/index.js'
import {
  common,
  src,
  elements,
  categories,
  languages,
  size,
} from '/data/names.js'

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.charMemory = charMemory
      this.character = null
      this.userMessage = null
      this.isCallCharTalkingAgain = false
      this.isCharListening = false
      this.isCharTalkingFinish = false
      this.talkingStep = 0
      this.aboutUser = {}
      this.lngSubscribers = []
      this.language = this.setLanguage()

      this.backgroundAnimation()
      this.gisapiaAnimation()
      this.createAudio()

      Memory.instance = this
    }

    return Memory.instance
  }

  backgroundAnimation() {
    new Background()
  }

  gisapiaAnimation() {
    new GisapiaAnimation()
  }

  createAudio() {
    this.typingAudio = createElementFn({
      element: elements.audio,
      src: src.audio.typing,
    })

    this.chatBubbleAudio = createElementFn({
      element: elements.audio,
      src: src.audio.chatBubble,
    })

    this.fallDownAudio = createElementFn({
      element: elements.audio,
      src: src.audio.throw,
    })

    this.backgroundAudio = createElementFn({
      element: elements.audio,
      src: src.audio.background,
    })

    this.finishAudio = createElementFn({
      element: elements.audio,
      src: src.audio.finish,
    })

    this.clickAudio = createElementFn({
      element: elements.audio,
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
    reload && this.backgroundAudio.load()
    pause ? this.backgroundAudio.pause() : this.backgroundAudio.play()
  }

  playFinishAudio({ pause, reload } = false) {
    reload && this.finishAudio.load()
    pause ? this.finishAudio.pause() : this.finishAudio.play()
  }

  getCharMemory({ scriptCategory }) {
    return this.charMemory[scriptCategory]
  }

  addDataToAboutUser({ scriptCategory, word }) {
    if (scriptCategory !== categories.hobby) {
      word = setUpperLetterFn({ text: word })
    }
    this.aboutUser[scriptCategory] = word
  }

  getAboutUser({ scriptCategory } = '') {
    return scriptCategory ? this.aboutUser[scriptCategory] : this.aboutUser
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
    if (lng) {
      this.language = lng
      localStorage.setItem(common.language, lng)
    } else
      return localStorage.getItem(common.language) || languages.pl[size.small]
  }

  getLanguage() {
    return this.language
  }

  lngSubscribe(cb) {
    this.lngSubscribers.push(cb)
  }

  callLngSubscribers() {
    this.lngSubscribers.map((cb) => {
      cb(this.language)
    })
  }

  restart() {
    this.character = null
    this.userMessage = null
    this.isCallCharTalkingAgain = false
    this.isCharListening = false
    this.isCharTalkingFinish = false
    this.talkingStep = 0
  }
}

const memory = new Memory()

export default memory
