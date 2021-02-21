export default class Screen {
  constructor(container) {
    this.screen = this.createScreen()
    this.attachToContainer(container)
    this.messages = []
  }

  createMessageContainer() {
    const messageContainer = document.createElement('div')
    messageContainer.classList.add('message-container')
    return messageContainer
  }

  createMessage(text, whoTalking) {
    const message = document.createElement('p')
    message.innerText = text
    message.classList.add('message')
    message.classList.add(`message-${whoTalking}`)
    return message
  }

  createAvatar(imagePath) {
    const avatar = document.createElement('img')
    avatar.src = imagePath
    avatar.classList.add('character-avatar')
    return avatar
  }

  attachToMessageContainer(container, ...elements) {
    console.log(elements)
    elements.map((element) => container.appendChild(element))
  }

  createScreen() {
    const screen = document.createElement('div')
    screen.classList.add('screen')
    return screen
  }

  attachToScreen(element) {
    this.screen.appendChild(element)
  }

  attachToContainer(container) {
    document.querySelector(container).appendChild(this.screen)
  }

  createLoader() {
    const loader = document.createElement('div')
    loader.classList.add('loader')
    return loader
  }

  removeLoader(loader) {
    console.log('removeLoader')
    loader.remove()
  }

  showTyping(time) {
    const loader = this.createLoader()
    this.attachToScreen(loader)
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
