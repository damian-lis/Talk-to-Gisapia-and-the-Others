export default class Memory {
  constructor() {
    this.step = 0
    this.character = null
    this.userMessage = null
  }

  increaseStep() {
    this.step++
  }

  getStep() {
    return this.step
  }

  setSelectedChar(character) {
    this.character = character
  }

  getCharacter() {
    return this.character
  }

  setUserMessage(message) {
    this.userMessage = message
  }

  getUserMessage() {
    return this.userMessage
  }
}
