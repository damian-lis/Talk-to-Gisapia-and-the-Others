import { GisapiaAnimation, Background } from './index.js'

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
      Memory.instance = this
    }
    return Memory.instance
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
}

const memory = new Memory()

export default memory
