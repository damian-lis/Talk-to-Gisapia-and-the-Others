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
    return this.memory[category].find((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    )
  }

  addToMemoryAboutUser(word, category) {
    this.memoryAboutUser[category] = word
  }

  setUpperLetter(message) {
    return message.charAt(0).toUpperCase() + message.slice(1)
  }

  addUserMessageToAnswer(message, category, { where, subcategory }) {
    switch (where) {
      case 'start':
        return (this.messages[category].answers[subcategory][0] =
          message + ' ' + this.messages[category].answers[subcategory][0])
      case 'end':
        return (this.messages[category].answers[
          subcategory
        ][0] += ` ${message}`)
    }
  }
}
