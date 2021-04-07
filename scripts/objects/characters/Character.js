import { findAndReplaceFn } from '../../helpers/index.js'
import { messages, answers, categories } from '../../../data/globalNames.js'
// Approve
class Character {
  constructor(scriptTalk, memory) {
    this.scriptTalk = this.setScriptTalkMessages(scriptTalk)
    this.memory = memory
    this.finalListening = false
  }

  getMemoryAboutUser() {
    return this.memory.aboutUser
  }

  changeTimeForTyping(timeForTyping) {
    const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5)
    const result = timeForTyping - timeForReduceTyping

    return result < 1000 ? 1000 : result
  }

  getScriptTalkMessages({ category, from, type }) {
    if (from === messages) return this.scriptTalk[category].messages
    if (from === answers) return this.scriptTalk[category].answers[type]
  }

  getCurrentScriptTalkCategory(conversationStep) {
    return Object.keys(this.scriptTalk)[conversationStep]
  }

  getScriptTalkCategories() {
    const categories = {}
    Object.keys(this.scriptTalk).map(
      (categoryName) => (categories[categoryName] = categoryName)
    )

    return categories
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
    if (scriptCategory !== categories.hobby) {
      word = this.setUpperLetter(word)
    }

    this.memory.aboutUser[scriptCategory] = word
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

  setScriptTalkMessages(scriptTalk) {
    for (const category in scriptTalk) {
      const messageNumber = Math.floor(
        Math.random() * scriptTalk[category].messages.length
      )
      const selectedMessage = scriptTalk[category].messages[messageNumber]

      scriptTalk[category].messages = selectedMessage

      for (const answerVariants in scriptTalk[category].answers) {
        const answerNumber = Math.floor(
          Math.random() * scriptTalk[category].answers[answerVariants].length
        )
        const selectedAnswer =
          scriptTalk[category].answers[answerVariants][answerNumber]

        scriptTalk[category].answers[answerVariants] = selectedAnswer
      }
    }
    return scriptTalk
  }

  changeScriptTalkMessages({ category, from, type }) {
    const wordsToSearchAndReplace = Object.keys(this.memory.aboutUser).map(
      (category) => {
        return {
          search: `-user${this.setUpperLetter(category)}-`,
          replace: this.memory.aboutUser[category],
        }
      }
    )
    if (wordsToSearchAndReplace.length === 0) return

    if (from === messages) {
      this.scriptTalk[category].messages = findAndReplaceFn(
        { wordsSets: wordsToSearchAndReplace },
        this.scriptTalk[category].messages
      )
    }

    if (from === answers) {
      this.scriptTalk[category].answers[type] = findAndReplaceFn(
        { wordsSets: wordsToSearchAndReplace },
        this.scriptTalk[category].answers[type]
      )
    }
  }
}

export default Character
