import { createElementFn, removeElFromContainer } from '../helpers/index.js'

export default class MessengerScreen {
  constructor(container) {
    this.screen = this.createScreen()
    this.attachToContainer(container)
    this.charMessagesPart = 0
  }

  createMessageContainer(whoTalking = 'user') {
    const messageContainer = createElementFn({
      elementToCreate: 'div',
      classesName: ['message-container'],
    })

    if (whoTalking !== 'user') {
      messageContainer.setAttribute('messagesPart', this.charMessagesPart)
    } else {
      this.charMessagesPart++
    }

    return messageContainer
  }

  createMessage(text, whoTalking) {
    const message = createElementFn({
      elementToCreate: 'p',
      text,
      classesName: ['message', `${whoTalking.toLowerCase()}-main`],
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
    removeElFromContainer('img', `[messagespart="${this.charMessagesPart}"]`)
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
    const messengerContainer = document.querySelector('.messenger-screen')

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

  createLoader(charName) {
    console.log(charName)
    const circleContainer = createElementFn({
      elementToCreate: 'div',
      classesName: ['circle-container'],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        elementToCreate: 'div',
        attributes: [{ type: 'id', name: `ball-${i + 1}` }],
        classesName: ['circle', `${charName.toLowerCase()}-main`],
      })
      circleContainer.appendChild(circle)
    }

    return circleContainer
  }

  removeLoader(loader) {
    loader.remove()
  }

  showTyping(time, charName) {
    const loader = this.createLoader(charName)
    this.attachToScreen(loader)
    this.scrollMessengerContainer()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
