import { messages, answers } from '/data/global/names.js'
import { setUpperLetterFn } from '/scripts/helpers/index.js'

class Character {
  constructor(scriptTalk, email, memory) {
    this.scriptTalk = scriptTalk
    this.modifiedScriptTalk = {}
    this.email = email
    this.modifiedEmail = {}
    this.memory = memory
  }

  setScriptTalk() {
    const lng = this.memory.getLanguage()
    let scriptTalkCopy = JSON.parse(JSON.stringify(this.scriptTalk))
    this.modifiedScriptTalk = this.setScriptTalkMessages(scriptTalkCopy[lng])
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
    return this.memory
      .getCharMemory(scriptCategory)
      .find((word) => message.toLowerCase().includes(word.toLowerCase()))
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

  findWordAndReplace({ wordsSets, texts }) {
    if (typeof texts === 'object') {
      let textsCopy = texts
      for (const text in textsCopy) {
        wordsSets.forEach((wordSet) => {
          if (textsCopy[text].includes(wordSet.search)) {
            const regexp = new RegExp(wordSet.search, 'gi')
            textsCopy[text] = textsCopy[text].replace(regexp, wordSet.replace)
          }
        })
      }

      return textsCopy
    } else {
      let textsCopy = texts
      textsCopy.map((text) => {
        wordsSets.forEach((wordSet) => {
          if (text.includes(wordSet.search)) {
            const regexp = new RegExp(wordSet.search, 'gi')
            text = text.replace(regexp, wordSet.replace)
          }
        })
        return text
      })

      return textsCopy
    }
  }

  setWordsToSearchAndReplace() {
    return Object.keys(this.memory.getAboutUser()).map((category) => {
      return {
        search: `-user${setUpperLetterFn(category)}-`,
        replace: this.memory.getAboutUser(category),
      }
    })
  }

  changeScriptTalkMessages({ category, from, type }) {
    const wordsToSearchAndReplace = this.setWordsToSearchAndReplace()

    if (wordsToSearchAndReplace.length === 0) return

    if (from === messages) {
      this.modifiedScriptTalk[category].messages = this.findWordAndReplace({
        wordsSets: wordsToSearchAndReplace,
        texts: this.modifiedScriptTalk[category].messages,
      })
    }

    if (from === answers) {
      this.modifiedScriptTalk[category].answers[type] = this.findWordAndReplace(
        {
          wordsSets: wordsToSearchAndReplace,
          texts: this.modifiedScriptTalk[category].answers[type],
        }
      )
    }
  }

  addUserDataToEmail({ lng, recipient }) {
    let emailCopy = JSON.parse(JSON.stringify(this.email[lng]))
    const wordsToSearchAndReplace = this.setWordsToSearchAndReplace()
    this.modifiedEmail = this.findWordAndReplace({
      wordsSets: wordsToSearchAndReplace,
      texts: emailCopy,
    })
    this.modifiedEmail.to = recipient
  }

  getEmail() {
    return this.modifiedEmail
  }
}

export default Character
