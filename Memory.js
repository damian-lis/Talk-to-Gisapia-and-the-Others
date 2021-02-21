import categories from './seeds/categories.js'

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.conversationStep = 0
      this.character = null
      this.userMessage = null
      this.categories = categories ? categories : []
      Memory.instance = this
    }
    return Memory.instance
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

  getRightCategory(step) {
    return this.categories[step]
  }

  setNumberOfQuestion(number) {
    this.numberOfQuestion = number
  }
}

const memory = new Memory()

export default memory
