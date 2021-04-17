import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import { classNames, src } from '/data/global/names.js'

class SelectCharUI {
  constructor(charNames, container, memory) {
    this.containerSent = document.querySelector(container)
    this.memory = memory
    const selectCharUIElements = this.createSelectCharUIElements(charNames)
    this.subscribers = {}

    appendElementsToContainerFn(selectCharUIElements, this.containerSent)
  }

  createSelectCharUIElements(charNames) {
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
            this.memory.playFallDownAudio()
            this.memory.playBackgroundAudio()
            this.subscribers['startTalking']()
          },
        },
      ],
    })

    this.talkAgainButton = createElementFn({
      element: 'button',
      textContent: 'Porozmawiaj ponownie',
      classes: [classNames.selectCharUI.startBtn, 'selectCharUI-readyBtn'],
      styles: [{ name: 'display', value: 'none' }],
      listeners: [
        {
          event: 'click',
          cb: () => {
            this.memory.restart()
            this.memory.playFinishAudio({ pause: true, reload: true })
            this.memory.playBackgroundAudio({ reload: true })
            this.messagesComponent.remove()
            this.changeDisplay({ initialSettings: true })
            this.removeActiveBtns()
            this.toggleStartCharTalkingBtn('off')
          },
        },
      ],
    })

    this.privatePolicy = this.createPrivatePolicy()

    return [
      this.headline,
      ...this.charButtons,
      this.startButton,
      this.talkAgainButton,
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
      classes: ['privatePolicy-link'],
    })

    this.privatePolicyLinkContainer.appendChild(this.privatePolicyLink)
    return this.privatePolicyLinkContainer
  }

  toggleStartCharTalkingBtn(toggle) {
    if (toggle === 'on') {
      this.startButton.disabled = false
      this.startButton.classList.add('selectCharUI-readyBtn')
    } else {
      this.startButton.disabled = true
      this.startButton.classList.remove('selectCharUI-readyBtn')
    }
  }

  handleFinishAudio() {
    this.memory.playFallDownAudio()
    this.memory.playFinishAudio()
    this.memory.playBackgroundAudio({ pause: true })
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
    this.messagesComponent = this.createMessagesComponent(messages)
    this.containerSent.prepend(this.messagesComponent)
    this.changeDisplay()
    this.handleFinishAudio()
  }

  changeDisplay({ initialSettings } = false) {
    ;[...this.charButtons, this.startButton, this.headline].map((element) => {
      element.style.display = initialSettings ? 'block' : 'none'
    })
    this.talkAgainButton.style.display = initialSettings ? 'none' : 'block'
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
