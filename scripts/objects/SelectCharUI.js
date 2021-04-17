import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import { classNames, src } from '/data/global/names.js'

class SelectCharUI {
  constructor(charNames, container) {
    this.containerSent = document.querySelector(container)
    const selectCharUIElements = this.createSelectCharUIElements(charNames)
    this.subscribers = {}

    appendElementsToContainerFn(selectCharUIElements, this.containerSent)
  }

  createSelectCharUIElements(charNames) {
    this.fallDownAudio = createElementFn({
      element: 'audio',
      src: src.audio.throw,
    })

    this.backgroundAudio = createElementFn({
      element: 'audio',
      src: src.audio.background,
    })

    this.finishAudio = createElementFn({
      element: 'audio',
      src: src.audio.finish,
    })

    this.headline = createElementFn({
      element: 'h1',
      textContent: 'Wybierz swojego rozmówcę!',
      classes: [classNames.selectCharUI.headline],
    })

    this.charButtons = Object.entries(charNames).map((charName) =>
      createElementFn({
        element: 'button',
        textContent: charName[1],
        classes: [classNames.selectCharUI.selectBtn],
        listeners: [
          {
            event: 'click',
            cb: (e) => {
              this.subscribers['selectChar'](charName[1])
              this.removeActiveBtns()
              this.setActiveBtn(e.target)
            },
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: 'button',
      textContent: 'Porozmawiaj',
      disabled: 'true',
      classes: [classNames.selectCharUI.startBtn],
      listeners: [
        {
          event: 'click',
          cb: () => {
            this.fallDownAudio.play()
            this.backgroundAudio.play()
            this.subscribers['startTalking']()
          },
        },
      ],
    })

    this.privatePolicy = this.createPrivatePolicy()

    return [
      this.headline,
      ...this.charButtons,
      this.startButton,
      this.privatePolicy,
    ]
  }

  createPrivatePolicy() {
    this.privatePolicyLinkContainer = createElementFn({
      element: 'div',
      classes: ['privatePolicy-link-container'],
    })

    this.privatePolicyLink = createElementFn({
      element: 'a',
      textContent: 'Polityka prywatności',
      href: '/privatePolicy.html',
      target: '_blank',
      classes: ['privatePolicy-link'],
    })

    this.privatePolicyLinkContainer.appendChild(this.privatePolicyLink)
    return this.privatePolicyLinkContainer
  }

  enableStartCharTalkingBtn() {
    this.startButton.disabled = false
    this.startButton.style.pointerEvents = 'all'
    this.startButton.style.backgroundColor = 'rgb(218, 4, 111)'
  }

  handleFinishAudio() {
    this.backgroundAudio.pause()
    this.fallDownAudio.play()
    this.finishAudio.play()
  }

  createMessagesComponent(messages) {
    const msgContainer = createElementFn({
      element: 'div',
    })

    messages.map((message) => {
      const msg = createElementFn({
        element: 'p',
        innerHTML: message,
        classes: [classNames.selectCharUI.message],
      })
      msgContainer.appendChild(msg)
    })

    return msgContainer
  }

  showFinishMessages(messages) {
    const messagesComponent = this.createMessagesComponent(messages)
    this.containerSent.innerHTML = ''
    this.containerSent.appendChild(messagesComponent)
    this.handleFinishAudio()
  }

  removeActiveBtns() {
    this.charButtons.map((btn) =>
      btn.classList.remove(classNames.selectCharUI.activeBtn)
    )
  }

  getCharButtons() {
    return this.charButtons
  }

  setActiveBtn(element) {
    element.classList.add(classNames.selectCharUI.activeBtn)
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}

export default SelectCharUI
