export default ({ wordsSets }, messages) => {
  return messages.map((message) => {
    wordsSets.forEach((wordSet) => {
      if (message.includes(wordSet.toFind)) {
        const regexp = new RegExp(wordSet.toFind, 'gi')
        message = message.replace(regexp, wordSet.toReplace)
      }
    })

    return message
  })
}
