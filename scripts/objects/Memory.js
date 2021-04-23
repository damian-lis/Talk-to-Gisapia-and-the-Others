import { GisapiaAnimation, Background } from './index.js'
import { createElementFn } from '/scripts/helpers/index.js'
import { src } from '/data/global/names.js'

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.talkingStep = 0
      this.character = null
      this.userMessage = null
      this.isCallCharTalkingAgain = false
      this.isCharListening = false
      this.isCharTalkingFinish = false
      this.backgroundAnimation = this.background()
      this.gisapiaAnimation = this.gisapiaAnimation()
      this.createAudio()
      this.language = this.setLanguage()
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

  restart() {
    this.talkingStep = 0
    this.character = null
    this.userMessage = null
    this.isCallCharTalkingAgain = false
    this.isCharListening = false
    this.isCharTalkingFinish = false
  }

  setLanguage() {
    if (localStorage.getItem('language')) {
      return localStorage.getItem('language')
    } else {
      return 'pl'
    }
  }

  changeLanguage() {
    if (this.language === 'pl') {
      localStorage.setItem('language', 'eng')
      this.language = 'eng'
    } else {
      localStorage.setItem('language', 'pl')
      this.language = 'pl'
    }
  }

  getLanguage() {
    return this.language
  }
}

const memory = new Memory()

export default memory
