export default (script) => {
  for (const category in script) {
    script[category].messages = script[category].messages.map((message) => {
      if (Array.isArray(message)) {
        return message[Math.floor(Math.random() * message.length)]
      } else {
        return message
      }
    })
    for (const answerVariants in script[category].answers) {
      script[category].answers[answerVariants] = script[category].answers[
        answerVariants
      ].map((answerVariant) => {
        if (Array.isArray(answerVariant)) {
          return answerVariant[Math.floor(Math.random() * answerVariant.length)]
        } else {
          return answerVariant
        }
      })
    }
  }
  return script
}
