import BackgroundAnimation from './animations/BackgroundAnimation.js'
import GisapiaAnimation from './animations/GisapiaAnimation.js'

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.conversationStep = 0
      this.character = null
      this.userMessage = null
      this.isCallAgain = false
      this.isListening = false
      this.isFinish = false
      this.backgroundAnimation = this.backgroundAnimation()
      this.gisapiaAnimation = this.gisapiaAnimation()
      Memory.instance = this
    }
    return Memory.instance
  }

  backgroundAnimation() {
    new BackgroundAnimation()
  }

  gisapiaAnimation() {
    new GisapiaAnimation()
  }

  setIsFinish(value) {
    this.isFinish = value
  }

  getIsFinish() {
    return this.isFinish
  }

  increaseConversationStep() {
    this.conversationStep++
  }

  getConversationStep() {
    return this.conversationStep
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

  // getCategory(step) {
  //   return this.categories[step]
  // }

  setNumberOfQuestion(number) {
    this.numberOfQuestion = number
  }

  setIsCallAgain(value) {
    this.isCallAgain = value
  }

  getIsCallAgain() {
    return this.isCallAgain
  }

  setIsListening(value) {
    this.isListening = value
  }

  getIsListening() {
    return this.isListening
  }
}

const memory = new Memory()

export default memory
