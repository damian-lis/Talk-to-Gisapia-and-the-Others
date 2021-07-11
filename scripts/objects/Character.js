import { common, types, reg } from '/data/names.js';
import { setUpperLetterFn } from '/scripts/helpers/index.js';

class Character {
  constructor(scriptTalk, email, memory) {
    this.scriptTalk = scriptTalk;
    this.email = email;
    this.memory = memory;
    this.modifiedScriptTalk = {};
    this.modifiedEmail = {};
  }

  setScriptTalk() {
    const lng = this.memory.getLanguage();

    let scriptTalkCopy = JSON.parse(JSON.stringify(this.scriptTalk));

    this.modifiedScriptTalk = this.setScriptTalkMessages(scriptTalkCopy[lng]);
    console.log(this.modifiedScriptTalk);
  }

  changeTimeForTyping(time) {
    const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5);
    const result = time - timeForReduceTyping;

    return result < 1000 ? 1000 : result;
  }

  getScriptTalkMessages({ category, from, type }) {
    switch (from) {
      case common.messages:
        return this.modifiedScriptTalk[category][common.messages];
      case common.answers:
        return this.modifiedScriptTalk[category][common.answers][type];
      default:
        break;
    }
  }

  getScriptTalkCategories() {
    const categories = {};
    Object.keys(this.modifiedScriptTalk).map(
      (categoryName) => (categories[categoryName] = categoryName)
    );

    return categories;
  }

  countTypingQuantity({ messageLength }) {
    let result;

    if (messageLength < 20) {
      result = 1;
    } else if (messageLength < 80) {
      result = 2;
    } else {
      result = 3;
    }

    return result;
  }

  setScriptTalkMessages(scriptTalk) {
    for (const category in scriptTalk) {
      const messageNumber = Math.floor(
        Math.random() * scriptTalk[category][common.messages].length
      );
      const selectedMessage =
        scriptTalk[category][common.messages][messageNumber];

      scriptTalk[category][common.messages] = selectedMessage;

      for (const answerVariants in scriptTalk[category][common.answers]) {
        const answerNumber = Math.floor(
          Math.random() *
            scriptTalk[category][common.answers][answerVariants].length
        );
        const selectedAnswer =
          scriptTalk[category][common.answers][answerVariants][answerNumber];

        scriptTalk[category][common.answers][answerVariants] = selectedAnswer;
      }
    }
    return scriptTalk;
  }

  setWordsToSearchAndReplace() {
    return Object.keys(this.memory.getAboutUser()).map((scriptCategory) => {
      return {
        search: `-${common.user}${setUpperLetterFn({ text: scriptCategory })}-`,
        replace: this.memory.getAboutUser({ scriptCategory }),
      };
    });
  }

  findWordAndReplace({ wordsSets, texts }) {
    const textsCopy = texts;

    switch (typeof texts) {
      case types.object:
        for (const text in textsCopy) {
          wordsSets.forEach((wordSet) => {
            if (textsCopy[text].includes(wordSet.search)) {
              const regexp = new RegExp(wordSet.search, reg.modifiers.gi);
              textsCopy[text] = textsCopy[text].replace(
                regexp,
                wordSet.replace
              );
            }
          });
        }

        break;
      default:
        textsCopy.map((text) => {
          wordsSets.forEach((wordSet) => {
            if (text.includes(wordSet.search)) {
              const regexp = new RegExp(wordSet.search, reg.modifiers.gi);
              text = text.replace(regexp, wordSet.replace);
            }
          });
          return text;
        });

        break;
    }

    return textsCopy;
  }

  changeScriptTalkMessages({ category, from, type }) {
    const wordsToSearchAndReplace = this.setWordsToSearchAndReplace();

    if (wordsToSearchAndReplace.length === 0) return;

    switch (from) {
      case common.messages:
        this.modifiedScriptTalk[category][
          common.messages
        ] = this.findWordAndReplace({
          wordsSets: wordsToSearchAndReplace,
          texts: this.modifiedScriptTalk[category][common.messages],
        });
        break;

      case common.answers:
        this.modifiedScriptTalk[category][common.answers][
          type
        ] = this.findWordAndReplace({
          wordsSets: wordsToSearchAndReplace,
          texts: this.modifiedScriptTalk[category][common.answers][type],
        });

      default:
        break;
    }
  }

  addUserDataToEmail({ lng, recipient }) {
    let emailCopy = JSON.parse(JSON.stringify(this.email[lng]));
    const wordsToSearchAndReplace = this.setWordsToSearchAndReplace();
    this.modifiedEmail = this.findWordAndReplace({
      wordsSets: wordsToSearchAndReplace,
      texts: emailCopy,
    });

    this.modifiedEmail.to = recipient;
  }

  getCurrentScriptTalkCategory({ conversationStep }) {
    console.log(this.modifiedScriptTalk);
    return Object.keys(this.modifiedScriptTalk)[conversationStep];
  }

  mustThink({ time }) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  checkUserMessageInMemory({ scriptCategory, message }) {
    return this.memory
      .getCharMemory({ scriptCategory })
      .find((word) => message.toLowerCase().includes(word.toLowerCase()));
  }

  countTimeForTyping({ messageLength, speed }) {
    const result = messageLength * speed;

    return result > 2500 ? 2500 : result < 1000 ? 1000 : result;
  }

  getEmail() {
    return this.modifiedEmail;
  }
}

export default Character;
