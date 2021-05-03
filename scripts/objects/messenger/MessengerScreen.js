import {
  createElementFn,
  appendElementsToContainerFn,
  setPropsFn,
  removeElAmongElsFn,
  setClassesFn,
} from '/scripts/helpers/index.js'

import { classNames, common, src } from '/data/main.js'

class MessengerScreen {
  constructor(container, selectCharUI, messengerInterface, memory) {
    this.memory = memory
    this.parent = container
    this.selectCharUI = selectCharUI
    this.messengerInterface = messengerInterface
    this.charMessagesPart = 0

    this.createElements()
    this.createComponents()

    appendElementsToContainerFn(
      [this.mainComponent],
      this.parent.getContainerInner()
    )
  }

  createElements() {
    this.container = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.screen],
    })

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
          cb: () => this.handleBackIconClick(),
        },
      ],
    })
  }

  createComponents() {
    this.mainComponent = appendElementsToContainerFn(
      [this.screen, this.backIcon],
      this.container
    )
  }

  handleBackIconClick() {
    this.memory.restart()
    this.memory.playFallDownAudio()
    this.memory.playClickAudio()
    this.selectCharUI.removeCharButtonsActive()
    this.selectCharUI.toggleReadyStartCharTalkingBtn(common.toggle.off)
    this.messengerInterface.toggleActivePanel(common.toggle.off)
    this.selectCharUI.move({ type: common.fromBottomShow })
    this.parent.move({ type: common.BackToTheTop })
    this.toggleShowBackBtn(common.toggle.off)
  }

  createChatBubbleComponent(text, whoTalking) {
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

  createLoaderComponent(charName) {
    const circleContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.loaderContainer],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        element: common.elements.div,
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

  toggleShowBackBtn(toggle) {
    setPropsFn([
      {
        elements: [this.backIcon],
        styleProps: [
          {
            name: common.styleProps.names.visibility,
            value:
              toggle === common.toggle.on
                ? common.styleProps.values.visible
                : common.styleProps.values.hidden,
          },
          {
            name: common.styleProps.names.opacity,
            value: toggle === common.toggle.on ? 1 : 0,
          },
        ],
      },
    ])
  }

  showTyping(time, charName) {
    this.memory.playTypingAudio()
    const loader = this.createLoaderComponent(charName)
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreen()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  changeColor(chosenChar) {
    setClassesFn([
      {
        elements: [this.container],
        initialClass: classNames.messenger.screen,
        classesToAdd: [`${chosenChar.name.toLowerCase()}-${common.second}`],
      },
      {
        elements: [this.backIcon],
        initialClass: classNames.messenger.backIcon,
        classesToAdd: [`${chosenChar.name.toLowerCase()}-${common.main}`],
      },
    ])
  }

  scrollMessengerScreen() {
    const valueToScroll =
      this.container.scrollHeight - this.container.clientHeight
    this.container.scroll(0, valueToScroll)
  }

  increaseCharMessagesPart() {
    this.charMessagesPart++
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
