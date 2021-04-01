import {
  createElementFn,
  removeElement,
  appendElementsToContainer,
} from '../../helpers/index.js'

class MessengerScreen {
  constructor(container) {
    this.containerSent = document.querySelector(container)
    this.screen = createElementFn({
      element: 'div',
      classes: ['screen'],
    })
    this.charMessagesPart = 0

    appendElementsToContainer([this.screen], this.containerSent)
  }

  increaseCharMessagesPart() {
    this.charMessagesPart++
  }

  createChatBubble(text, whoTalking) {
    const { name, avatar: avatarImage } = whoTalking

    const messageContainer =
      name !== 'user'
        ? createElementFn({
            element: 'div',
            classes: ['message-container'],
            attributes: [{ type: 'messagespart', name: this.charMessagesPart }],
          })
        : createElementFn({
            element: 'div',
            classes: ['message-container'],
          })
    const message = createElementFn({
      element: 'p',
      textContent: text,
      classes: ['message', `${name.toLowerCase()}-main`],
    })
    if (name !== 'user') {
      const avatar = createElementFn({
        element: 'img',
        src: avatarImage,
        classes: ['character-avatar'],
      })
      removeElement({
        element: 'img',
        search: `[messagespart="${this.charMessagesPart}"]`,
      })
      messageContainer.appendChild(avatar)
    }

    messageContainer.appendChild(message)

    return messageContainer
  }

  scrollMessengerScreenContainer() {
    const valueToScroll =
      this.containerSent.scrollHeight - this.containerSent.clientHeight
    this.containerSent.scroll(0, valueToScroll)
  }

  attachToMessengerScreen(element) {
    this.screen.appendChild(element)
  }

  createLoader(charName) {
    const circleContainer = createElementFn({
      element: 'div',
      classes: ['circle-container'],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        element: 'div',
        attributes: [{ type: 'id', name: `ball-${i + 1}` }],
        classes: ['circle', `${charName.toLowerCase()}-main`],
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
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreenContainer()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

export default MessengerScreen
