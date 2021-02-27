import { createElementFn } from '../helpers/index.js'

export default class Screen {
  constructor(container) {
    this.screen = this.createScreen()
    this.attachToContainer(container)
    this.messages = []
  }

  createMessageContainer() {
    const messageContainer = createElementFn({
      elementToCreate: 'div',
      classesName: ['message-container'],
    })

    return messageContainer
  }

  createMessage(text, whoTalking) {
    const message = createElementFn({
      elementToCreate: 'p',
      text,
      classesName: ['message', `message-${whoTalking}`],
    })

    return message
  }

  createAvatar(imagePath) {
    const avatar = createElementFn({
      elementToCreate: 'img',
      src: imagePath,
      classesName: ['character-avatar'],
    })
    return avatar
  }

  attachToMessageContainer(container, ...elements) {
    elements.map((element) => container.appendChild(element))
  }

  createScreen() {
    const screen = createElementFn({
      elementToCreate: 'div',
      classesName: ['screen'],
    })

    return screen
  }

  scrollMessengerContainer() {
    const messengerContainer = document.querySelector(
      '.messenger-screen-container'
    )

    const valueToScroll =
      messengerContainer.scrollHeight - messengerContainer.clientHeight
    messengerContainer.scroll(0, valueToScroll)
  }

  attachToScreen(element) {
    this.screen.appendChild(element)
    this.scrollMessengerContainer()
  }

  attachToContainer(container) {
    document.querySelector(container).appendChild(this.screen)
  }

  createLoader() {
    const circleContainer = createElementFn({
      elementToCreate: 'div',
      attributes: [{ type: 'id', name: 'circle-container' }],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        elementToCreate: 'div',
        attributes: [{ type: 'id', name: `ball-${i + 1}` }],
        classesName: ['circle'],
      })
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
    this.scrollMessengerContainer()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
