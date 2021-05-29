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
  animationSettings,
  toggleValue,
} from '/data/names.js'

class MessengerScreen {
  constructor({ container, objects }) {
    this.memory = objects.memory
    this.container = container
    this.selectCharUI = objects.selectCharUI
    this.messengerInterface = objects.messengerInterface
    this.charMessagesPart = 0

    this.createElements()
    this.createComponents()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container: this.container.getMainContainerInner(),
    })
  }

  createElements() {
    this.mainContainer = createElementFn({
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
      container: this.mainContainer,
    })
  }

  handleBackIconClick() {
    this.memory.restart()
    this.memory.playFallDownAudio()
    this.memory.playClickAudio()
    this.selectCharUI.removeCharButtonsActive()
    this.selectCharUI.toggleReadyStartCharTalkingBtn(toggleValue.off)
    this.messengerInterface.toggleActivePanel(toggleValue.off)
    this.selectCharUI.move({
      type: animationSettings.selectCharUI.fromBottomShow,
    })
    this.container.move({
      type: animationSettings.messenger.backToTheTop,
    })
    this.toggleShowBackIcon(toggleValue.off)
  }

  createChatBubbleComponent({
    message: text,
    whoTalking: { name, avatar: avatarImage },
  }) {
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

  createLoaderComponent({ charName }) {
    const circleContainer = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.loaderContainer],
    })

    for (let i = 0; i < 3; i++) {
      const circle = createElementFn({
        element: elements.div,
        attributes: [{ name: common.id, value: `${common.ball}-${i + 1}` }],
        classes: [
          classNames.messenger.loader,
          `${charName.toLowerCase()}-${common.main}`,
        ],
      })
      circleContainer.appendChild(circle)
    }

    return circleContainer
  }

  toggleShowBackIcon(toggle) {
    setPropsFn({
      toggle,
      objs: [
        {
          elements: [this.backIcon],
          styleProps: [
            {
              name: styleProps.names.visibility,
              values: {
                on: styleProps.values.visible,
                off: styleProps.values.hidden,
              },
            },
            {
              name: styleProps.names.opacity,
              values: {
                on: 1,
                off: 0,
              },
            },
          ],
        },
      ],
    })
  }

  async showTyping({ time, charName }) {
    this.memory.playTypingAudio()
    const loader = this.createLoaderComponent({ charName })
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreen()
    setTimeout(() => this.removeLoader(loader), time)
    await new Promise((resolve) => setTimeout(resolve, time))
  }

  changeColor({ char }) {
    setClassesFn({
      objs: [
        {
          elements: [this.mainContainer],
          initialClass: classNames.messenger.screen,
          classes: [`${char.name.toLowerCase()}-${common.second}`],
        },
        {
          elements: [this.backIcon],
          initialClass: classNames.messenger.backIcon,
          classes: [`${char.name.toLowerCase()}-${common.main}`],
        },
      ],
    })
  }

  scrollMessengerScreen() {
    const valueToScroll =
      this.mainContainer.scrollHeight - this.mainContainer.clientHeight
    this.mainContainer.scroll(0, valueToScroll)
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
