import {
  createElementFn,
  removeElAmongElsFn,
  appendElementsToContainerFn,
  runElementsFn,
} from '/scripts/helpers/index.js'

import {
  classNames,
  classReferences,
  animationSettings,
  src,
} from '/data/global/names.js'

class MessengerScreen {
  constructor(container, memory, selectCharUI) {
    this.memory = memory
    this.selectCharUI = selectCharUI
    this.containerSent = document.querySelector(container)
    this.messengerScreenElements = this.createMessengerScreenElements()
    this.charMessagesPart = 0

    this.connectMessengerScreenElements(
      this.messengerScreenElements,
      this.containerSent
    )
  }

  connectMessengerScreenElements(elements, container) {
    const [screen, backBtn] = elements
    this.containerSent.appendChild(backBtn)
    appendElementsToContainerFn([screen], container)
  }

  createMessengerScreenElements() {
    this.typingAudio = createElementFn({
      element: 'audio',
      src: src.audio.typing,
    })

    this.chatBubbleAudio = createElementFn({
      element: 'audio',
      src: src.audio.chatBubble,
    })

    this.screen = createElementFn({
      element: 'div',
      classes: [classNames.messenger.screen],
    })

    this.backBtn = createElementFn({
      element: 'img',
      classes: ['messenger-back-icon'],
      src: '/images/icons/back.svg',
      listeners: [
        {
          event: 'click',
          cb: () => {
            this.selectCharUI.removeActiveBtns()
            this.deactivateBackBtn()
            runElementsFn([
              {
                element: classReferences.selectCharUI.main,
                animation: animationSettings.selectCharUI.end,
              },
              {
                element: classReferences.messenger.main,
                animation: animationSettings.messenger.end,
              },
            ])
          },
        },
      ],
    })

    return [this.screen, this.backBtn]
  }

  setTypingOn() {
    this.typing = true
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
      removeElAmongElsFn({
        element: 'img',
        search: `[messagespart="${this.charMessagesPart}"]`,
      })
      messageContainer.appendChild(avatar)
    }
    this.chatBubbleAudio.play()
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
    this.typingAudio.play()
    const loader = this.createLoader(charName)
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreenContainer()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  removeChatBubbles() {
    this.screen.innerHTML = ''
  }

  activateBackBtn() {
    this.backBtn.style.visibility = 'visible'
    this.backBtn.style.opacity = 1
  }

  deactivateBackBtn() {
    this.backBtn.style.visibility = 'hidden'
    this.backBtn.style.opacity = '0'
  }
}

export default MessengerScreen
