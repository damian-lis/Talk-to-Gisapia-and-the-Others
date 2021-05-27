import { common, types, reg } from '/data/names.js'
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
    switch (from) {
      case common.messages:
        return this.modifiedScriptTalk[category][common.messages]
      case common.answers:
        return this.modifiedScriptTalk[category][common.answers][type]
      default:
        break
    }
  }

  getScriptTalkCategories() {
    const categories = {}
    Object.keys(this.modifiedScriptTalk).map(
      (categoryName) => (categories[categoryName] = categoryName)
    )

    return categories
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

  setScriptTalkMessages(scriptTalk) {
    for (const category in scriptTalk) {
      const messageNumber = Math.floor(
        Math.random() * scriptTalk[category][common.messages].length
      )
      const selectedMessage =
        scriptTalk[category][common.messages][messageNumber]

      scriptTalk[category][common.messages] = selectedMessage

      for (const answerVariants in scriptTalk[category][common.answers]) {
        const answerNumber = Math.floor(
          Math.random() *
            scriptTalk[category][common.answers][answerVariants].length
        )
        const selectedAnswer =
          scriptTalk[category][common.answers][answerVariants][answerNumber]

        scriptTalk[category][common.answers][answerVariants] = selectedAnswer
      }
    }
    return scriptTalk
  }

  setWordsToSearchAndReplace() {
    return Object.keys(this.memory.getAboutUser()).map((category) => {
      return {
        search: `-${common.user}${setUpperLetterFn(category)}-`,
        replace: this.memory.getAboutUser(category),
      }
    })
  }

  findWordAndReplace({ wordsSets, texts }) {
    if (typeof texts === types.object) {
      let textsCopy = texts
      for (const text in textsCopy) {
        wordsSets.forEach((wordSet) => {
          if (textsCopy[text].includes(wordSet.search)) {
            const regexp = new RegExp(wordSet.search, reg.modifiers.gi)
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
            const regexp = new RegExp(wordSet.search, reg.modifiers.gi)
            text = text.replace(regexp, wordSet.replace)
          }
        })
        return text
      })

      return textsCopy
    }
  }

  changeScriptTalkMessages({ category, from, type }) {
    const wordsToSearchAndReplace = this.setWordsToSearchAndReplace()

    if (wordsToSearchAndReplace.length === 0) return

    if (from === common.messages) {
      this.modifiedScriptTalk[category][
        common.messages
      ] = this.findWordAndReplace({
        wordsSets: wordsToSearchAndReplace,
        texts: this.modifiedScriptTalk[category][common.messages],
      })
    }

    if (from === common.answers) {
      this.modifiedScriptTalk[category][common.answers][
        type
      ] = this.findWordAndReplace({
        wordsSets: wordsToSearchAndReplace,
        texts: this.modifiedScriptTalk[category][common.answers][type],
      })
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

  getCurrentScriptTalkCategory(conversationStep) {
    return Object.keys(this.modifiedScriptTalk)[conversationStep]
  }

  mustThink(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  checkUserMessageInMemory(scriptCategory, message) {
    return this.memory
      .getCharMemory(scriptCategory)
      .find((word) => message.toLowerCase().includes(word.toLowerCase()))
  }

  countTimeForTyping(textLength, speed) {
    const result = textLength * speed

    return result > 2500 ? 2500 : result < 1000 ? 1000 : result
  }

  getEmail() {
    return this.modifiedEmail
  }
}

export default Character
