export default (message, whoTalking) => {
  const messageWrapped = document.createElement('div')
  messageWrapped.innerText = message
  messageWrapped.classList.add('messageWrapped')
  return messageWrapped
}
