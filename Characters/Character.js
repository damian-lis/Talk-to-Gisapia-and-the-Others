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

  countTypingQuantity(textLength) {
    let result
    if (textLength < 20) {
      result = 1
    } else if (textLength < 80) {
      result = 2
    } else if (textLength >= 80) {
      result = 3
    }

    return result
  }

  countTimeForTyping(textLength, speed) {
    const result = textLength * speed

    return result > 2500 ? 2500 : result < 1000 ? 1000 : result
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

  addAboutUserToMessages(currentCategory, categories) {
    categories.pop()
    categories.forEach((category, index) => {
      this.messages[currentCategory].messages[
        index + 1
      ] += this.memoryAboutUser[category]
    })
  }
}
