export default (message, whoTalking) => {
  const messageWrapped = document.createElement('div')
  messageWrapped.innerText = message
  messageWrapped.classList.add('messageWrapper')
  messageWrapped.classList.add(`messageWrapper-${whoTalking}`)
  return messageWrapped
}
