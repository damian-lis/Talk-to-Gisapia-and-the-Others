import {
  createElementFn,
  appendElementsToContainerFn,
  runElementsFn,
  setPropsFn,
  removeElAmongElsFn,
} from '/scripts/helpers/index.js'

import {
  classNames,
  classReferences,
  animationSettings,
  common,
  src,
} from '/data/main.js'

class MessengerScreen {
  constructor(container, selectCharUI, messengerInterface, memory) {
    this.memory = memory
    this.selectCharUI = selectCharUI
    this.messengerInterface = messengerInterface
    this.containerSent = document.querySelector(container)
    this.charMessagesPart = 0

    this.createElements()
    this.createLists()

    appendElementsToContainerFn(this.allElementsList, this.containerSent)
  }

  createElements() {
    this.screen = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.screenInner],
    })

    this.backIcon = createElementFn({
      element: common.elements.img,
      classes: [classNames.messenger.backIcon],
      src: src.messenger.backIcon,
      listeners: [
        {
          event: common.events.click,
          cb: () => this.handleBackIconClick,
        },
      ],
    })
  }

  handleBackIconClick() {
    this.memory.restart()
    this.memory.playFallDownAudio()
    this.memory.playClickAudio()
    this.selectCharUI.removeCharButtonsActive()
    this.selectCharUI.toggleReadyStartCharTalkingBtn(common.toggle.off)
    this.messengerInterface.toggleActivePanel(common.toggle.off)
    this.toggleShowBackBtn(common.toggle.off)
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
  }

  createChatBubble(text, whoTalking) {
    const { name, avatar: avatarImage } = whoTalking

    const messageContainer =
      name !== common.user
        ? createElementFn({
            element: common.elements.div,
            classes: [classNames.messenger.messageContainer],
            attributes: [
              { type: common.messagesPart, name: this.charMessagesPart },
            ],
          })
        : createElementFn({
            element: common.elements.div,
            classes: [classNames.messenger.messageContainer],
          })
    const message = createElementFn({
      element: common.elements.p,
      innerHTML: text,
      classes: [
        classNames.messenger.message,
        `${name.toLowerCase()}-${common.main}`,
      ],
    })
    if (name !== common.user) {
      const avatar = createElementFn({
        element: common.elements.img,
        src: avatarImage,
        classes: [classNames.messenger.avatar],
      })
      removeElAmongElsFn({
        element: common.elements.img,
        elementsName: `[${common.messagesPart}="${this.charMessagesPart}"]`,
      })
      messageContainer.appendChild(avatar)
    }

    messageContainer.appendChild(message)
    this.memory.playChatBubbleAudio()

    return messageContainer
  }

  createLoader(charName) {
    const circleContainer = createElementFn({
      element: common.elenets.div,
      classes: [classNames.messenger.loaderContainer],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        element: common.elenets.div,
        attributes: [{ type: common.id, name: `${common.ball}-${i + 1}` }],
        classes: [
          classNames.messenger.loader,
          `${charName.toLowerCase()}-${common.main}`,
        ],
      })
      circleContainer.appendChild(circle)
    }

    return circleContainer
  }

  createLists() {
    this.allElementsList = [this.backIcon, this.screen]
  }

  toggleShowBackBtn(toggle) {
    setPropsFn([
      {
        elements: [this.backIcon],
        styleProps: [
          {
            name: 'visibility',
            value: toggle === common.toggle.on ? 'visible' : 'hidden',
          },
          { name: 'opacity', value: toggle === common.toggle.on ? 1 : 0 },
        ],
      },
    ])
  }

  showTyping(time, charName) {
    this.memory.playTypingAudio()
    const loader = this.createLoader(charName)
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreen()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  increaseCharMessagesPart() {
    this.charMessagesPart++
  }

  scrollMessengerScreen() {
    const valueToScroll =
      this.containerSent.scrollHeight - this.containerSent.clientHeight
    this.containerSent.scroll(0, valueToScroll)
  }

  attachToMessengerScreen(element) {
    this.screen.appendChild(element)
  }

  removeLoader(loader) {
    loader.remove()
  }

  removeChatBubbles() {
    this.screen.innerHTML = ''
  }
}

export default MessengerScreen
