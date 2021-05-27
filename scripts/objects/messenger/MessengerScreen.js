import {
  createElementFn,
  appendElementsToContainerFn,
  setPropsFn,
  removeElAmongElsFn,
  setClassesFn,
} from '/scripts/helpers/index.js'

import {
  classNames,
  common,
  src,
  elements,
  events,
  styleProps,
} from '/data/names.js'

class MessengerScreen {
  constructor(container, selectCharUI, messengerInterface, memory) {
    this.memory = memory
    this.parent = container
    this.selectCharUI = selectCharUI
    this.messengerInterface = messengerInterface
    this.charMessagesPart = 0

    this.createElements()
    this.createComponents()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container: this.parent.getContainerInner(),
    })
  }

  createElements() {
    this.container = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.screen],
    })

    this.screen = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.screenInner],
    })

    this.backIcon = createElementFn({
      element: elements.img,
      classes: [classNames.messenger.backIcon],
      src: src.messenger.backIcon,
      listeners: [
        {
          event: events.click,
          cb: () => this.handleBackIconClick(),
        },
      ],
    })
  }

  createComponents() {
    this.mainComponent = appendElementsToContainerFn({
      elements: [this.screen, this.backIcon],
      container: this.container,
    })
  }

  handleBackIconClick() {
    this.memory.restart()
    this.memory.playFallDownAudio()
    this.memory.playClickAudio()
    this.selectCharUI.removeCharButtonsActive()
    this.selectCharUI.toggleReadyStartCharTalkingBtn(common.off)
    this.messengerInterface.toggleActivePanel(common.off)
    this.selectCharUI.move({ type: common.fromBottomShow })
    this.parent.move({ type: common.BackToTheTop })
    this.toggleShowBackBtn(common.off)
  }

  createChatBubbleComponent(text, whoTalking) {
    const { name, avatar: avatarImage } = whoTalking

    const messageContainer =
      name !== common.user
        ? createElementFn({
            element: elements.div,
            classes: [classNames.messenger.messageContainer],
            attributes: [
              { name: common.messagesPart, value: this.charMessagesPart },
            ],
          })
        : createElementFn({
            element: elements.div,
            classes: [classNames.messenger.messageContainer],
          })

    const message = createElementFn({
      element: elements.p,
      innerHTML: text,
      classes: [
        classNames.messenger.message,
        `${name.toLowerCase()}-${common.main}`,
      ],
    })
    if (name !== common.user) {
      const avatar = createElementFn({
        element: elements.img,
        src: avatarImage,
        classes: [classNames.messenger.avatar],
      })
      removeElAmongElsFn({
        elementToRemove: elements.img,
        removeFromElements: `[${common.messagesPart}="${this.charMessagesPart}"]`,
      })
      messageContainer.appendChild(avatar)
    }

    messageContainer.appendChild(message)
    this.memory.playChatBubbleAudio()

    return messageContainer
  }

  createLoaderComponent(charName) {
    const circleContainer = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.loaderContainer],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        element: elements.div,
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
    setPropsFn({
      objs: [
        {
          elements: [this.backIcon],
          styleProps: [
            {
              name: styleProps.names.visibility,
              value:
                toggle === common.on
                  ? styleProps.values.visible
                  : styleProps.values.hidden,
            },
            {
              name: styleProps.names.opacity,
              value: toggle === common.on ? 1 : 0,
            },
          ],
        },
      ],
    })
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
    setClassesFn({
      objs: [
        {
          elements: [this.container],
          initialClass: classNames.messenger.screen,
          classes: [`${chosenChar.name.toLowerCase()}-${common.second}`],
        },
        {
          elements: [this.backIcon],
          initialClass: classNames.messenger.backIcon,
          classes: [`${chosenChar.name.toLowerCase()}-${common.main}`],
        },
      ],
    })
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
