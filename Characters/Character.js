export default class Character {
  constructor(dataSets, memorySets) {
    this.dataSets = dataSets
    this.memorySets = memorySets
    this.memoryAboutUser = {}
  }

  changeTimeForTyping(timeForTyping) {
    const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5)
    const result = timeForTyping - timeForReduceTyping

    return result < 1000 ? 1000 : result
  }

  getCategory(conversationStep) {
    return this.dataSets[conversationStep].category
  }

  getMessages(conversationStep) {
    return this.dataSets[conversationStep].messages
  }

  getAllCategories() {
    let result = []
    this.dataSets.map((dataSet) => result.push(dataSet.category))
    return result
  }

  getAnswers(conversationStep, { type }) {
    return this.dataSets[conversationStep].answers[type]
  }

  mustThink(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  checkUserMessageInMemory(category, message) {
    return this.memorySets[category].find((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    )
  }

  addToMemoryAboutUser(category, word) {
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

  addUserMessageToAnswer(message, conversationStep, { place, where }) {
    switch (place) {
      case 'start':
        return (this.dataSets[conversationStep].answers[where][0] =
          message + ' ' + this.dataSets[conversationStep].answers[where][0])
      case 'end':
        return (this.dataSets[conversationStep].answers[
          where
        ][0] += ` ${message}`)
    }
  }

  addAboutUserToMessages(categories, conversationStep) {
    console.log(this.dataSets[conversationStep])
    categories.pop()
    categories.forEach((category, index) => {
      this.dataSets[conversationStep].messages[
        index + 1
      ] += this.memoryAboutUser[category]
    })
  }
}
