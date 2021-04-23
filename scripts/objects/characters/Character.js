import { findAndReplaceFn } from '/scripts/helpers/index.js'
import { messages, answers, categories } from '/data/global/names.js'
import { memory } from '../index.js'

class Character {
  constructor(scriptTalk, charMemory) {
    this.scriptTalk = scriptTalk
    this.charMemory = charMemory
    this.memory = memory
  }

  deleteMemoryAboutUser() {
    this.charMemory.aboutUser = {}
  }

  setScriptTalk() {
    this.scriptTalkCopy = JSON.parse(JSON.stringify(this.scriptTalk))
    this.modifiedScriptTalk = this.setScriptTalkMessages(
      this.scriptTalkCopy[this.memory.getLanguage()]
    )
  }

  getMemoryAboutUser() {
    return this.charMemory.aboutUser
  }

  changeTimeForTyping(timeForTyping) {
    const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5)
    const result = timeForTyping - timeForReduceTyping

    return result < 1000 ? 1000 : result
  }

  getScriptTalkMessages({ category, from, type }) {
    if (from === messages) return this.modifiedScriptTalk[category].messages
    if (from === answers) return this.modifiedScriptTalk[category].answers[type]
  }

  getCurrentScriptTalkCategory(conversationStep) {
    return Object.keys(this.modifiedScriptTalk)[conversationStep]
  }

  getScriptTalkCategories() {
    const categories = {}
    Object.keys(this.modifiedScriptTalk).map(
      (categoryName) => (categories[categoryName] = categoryName)
    )

    return categories
  }

  mustThink(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  checkUserMessageInMemory(scriptCategory, message) {
    return this.charMemory[scriptCategory].find((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    )
  }

  addToMemoryAboutUser(scriptCategory, word) {
    if (scriptCategory !== categories.hobby) {
      word = this.setUpperLetter(word)
    }

    this.charMemory.aboutUser[scriptCategory] = word
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
    } else {
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
    const wordsToSearchAndReplace = Object.keys(this.charMemory.aboutUser).map(
      (category) => {
        return {
          search: `-user${this.setUpperLetter(category)}-`,
          replace: this.charMemory.aboutUser[category],
        }
      }
    )
    if (wordsToSearchAndReplace.length === 0) return

    if (from === messages) {
      this.modifiedScriptTalk[category].messages = findAndReplaceFn(
        { wordsSets: wordsToSearchAndReplace },
        this.modifiedScriptTalk[category].messages
      )
    }

    if (from === answers) {
      this.modifiedScriptTalk[category].answers[type] = findAndReplaceFn(
        { wordsSets: wordsToSearchAndReplace },
        this.modifiedScriptTalk[category].answers[type]
      )
    }
  }
}

export default Character
