import {
  createElementFn,
  appendElementsToContainerFn,
  runElementsFn,
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
          cb: () => {
            this.memory.restart()
            this.memory.playFallDownAudio()
            this.memory.playClickAudio()
            this.selectCharUI.removeActives(
              this.selectCharUI.getCharButtons(),
              classNames.selectCharUI.selectBtnActive
            )
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
          },
        },
      ],
    })

    return [this.screen, this.backIcon]
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
      this.removeImgAmongImgs({
        element: common.elements.img,
        search: `[${common.messagesPart}="${this.charMessagesPart}"]`,
      })
      messageContainer.appendChild(avatar)
    }
    this.memory.playChatBubbleAudio()
    messageContainer.appendChild(message)

    return messageContainer
  }

  removeImgAmongImgs({ element, search }) {
    let searchEls = search
    if (typeof search === common.types.string) {
      searchEls = document.querySelectorAll(search)
    }

    searchEls[searchEls.length - 1] &&
      searchEls[searchEls.length - 1].querySelector(element).remove()
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

  removeLoader(loader) {
    loader.remove()
  }

  showTyping(time, charName) {
    this.memory.playTypingAudio()
    const loader = this.createLoader(charName)
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreenContainer()
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  removeChatBubbles() {
    this.screen.innerHTML = ''
  }

  toggleShowBackBtn(toggle) {
    this.backIcon.style.visibility =
      toggle === common.toggle.on
        ? common.styleProps.values.visible
        : common.styleProps.values.hidden
    this.backIcon.style.opacity = toggle === common.toggle.on ? 1 : 0
  }
}

export default MessengerScreen
