export default (message, whoTalking) => {
  const messageWrapper = document.createElement('div')
  messageWrapper.classList.add('message-wrapper')
  //
  const messageInner = document.createElement('div')
  messageInner.classList.add('message-inner')
  messageInner.classList.add(`message-inner-${whoTalking}`)
  messageInner.innerText = message
  //
  messageWrapper.appendChild(messageInner)

  return messageWrapper
}
