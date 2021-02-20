export default class Memory {
  constructor(categories, step) {
    this.conversationStep = step ? step : 0
    this.character = null
    this.userMessage = null
    this.categories = categories ? categories : []
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
