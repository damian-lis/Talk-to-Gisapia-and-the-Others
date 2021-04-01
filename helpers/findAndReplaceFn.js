export default ({ wordsSets }, messages) => {
  return messages.map((message) => {
    wordsSets.forEach((wordSet) => {
      if (message.includes(wordSet.search)) {
        const regexp = new RegExp(wordSet.search, 'gi')
        message = message.replace(regexp, wordSet.replace)
      }
    })

    return message
  })
}
