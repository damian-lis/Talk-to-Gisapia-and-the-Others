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
    this.screen.scroll(0, 1000)
    this.screen.appendChild(element)
  }

  attachToContainer(container) {
    document.querySelector(container).appendChild(this.screen)
  }

  createLoader() {
    const circleContainer = document.createElement('div')
    circleContainer.setAttribute('id', 'circle-container')
    for (let i = 0; i < 3; i++) {
      const circle = document.createElement('div')
      circle.classList.add('circle')
      circle.setAttribute('id', `ball-${i + 1}`)
      circleContainer.appendChild(circle)
    }

    return circleContainer
  }

  removeLoader(loader) {
    loader.remove()
  }

  showTyping(time) {
    const loader = this.createLoader()
    this.attachToScreen(loader)
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
