import {
  createElementFn,
  removeElementFn,
  appendElementsToContainerFn,
} from '../helpers/index.js'

import { classNames } from '../../data/globalNames.js'

class MessengerScreen {
  constructor(container) {
    this.containerSent = document.querySelector(container)
    this.screen = createElementFn({
      element: 'div',
      classes: [classNames.messenger.screen],
    })
    this.charMessagesPart = 0

    appendElementsToContainerFn([this.screen], this.containerSent)
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
            classes: [classNames.messenger.messageContainer],
            attributes: [{ type: 'messagespart', name: this.charMessagesPart }],
          })
        : createElementFn({
            element: 'div',
            classes: [classNames.messenger.messageContainer],
          })
    const message = createElementFn({
      element: 'p',
      innerHTML: text,
      classes: [classNames.messenger.message, `${name.toLowerCase()}-main`],
    })
    if (name !== 'user') {
      const avatar = createElementFn({
        element: 'img',
        src: avatarImage,
        classes: [classNames.messenger.characterAvatar],
      })
      removeElementFn({
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
      classes: [classNames.messenger.loaderContainer],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        element: 'div',
        attributes: [{ type: 'id', name: `ball-${i + 1}` }],
        classes: [
          classNames.messenger.loader,
          `${charName.toLowerCase()}-main`,
        ],
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
