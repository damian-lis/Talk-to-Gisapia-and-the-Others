export default class Character {
  constructor(scriptTalk, memory) {
    this.scriptTalk = scriptTalk
    this.memory = memory
    this.memoryAboutUser = {}
  }

  getMemoryAboutUser() {
    return this.memoryAboutUser
  }

  changeTimeForTyping(timeForTyping) {
    const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5)
    const result = timeForTyping - timeForReduceTyping

    return result < 1000 ? 1000 : result
  }

  getCurrentCategory(conversationStep) {
    return this.scriptTalk[conversationStep].category
  }

  getScriptMessages(conversationStep) {
    return this.scriptTalk[conversationStep].messages
  }

  getScriptCategories() {
    let result = []
    this.scriptTalk.map((part) => result.push(part.category))
    return result
  }

  getScriptAnswers(conversationStep, { from }) {
    return this.scriptTalk[conversationStep].answers[from]
  }

  mustThink(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  checkUserMessageInMemory(scriptCategory, message) {
    return this.memory[scriptCategory].find((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    )
  }

  addToMemoryAboutUser(scriptCategory, word) {
    this.memoryAboutUser[scriptCategory] = word
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
        return (this.scriptTalk[conversationStep].answers[where][0] =
          message + ' ' + this.scriptTalk[conversationStep].answers[where][0])
      case 'end':
        return (this.scriptTalk[conversationStep].answers[
          where
        ][0] += ` ${message}`)
    }
  }

  addAboutUserToMessages(scriptCategories, conversationStep) {
    scriptCategories.pop()
    scriptCategories.forEach((scriptCategory, index) => {
      this.scriptTalk[conversationStep].messages[
        index + 1
      ] += this.memoryAboutUser[scriptCategory]
    })
  }
}
