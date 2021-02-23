export default class Character {
  constructor(messages) {
    this.messages = messages
    this.memoryAboutUser = {}
  }

  getMessagesCollection(category) {
    return this.messages[category]
  }

  mustThink(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  checkUserMessageInMemory(message, category) {
    return this.memory[category].filter((word) => message.includes(word))
  }

  addToMemoryAboutUser(word, category) {
    this.memoryAboutUser[category] = word
  }
}
