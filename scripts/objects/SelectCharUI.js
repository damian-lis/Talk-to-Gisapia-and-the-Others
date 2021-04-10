import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import { classNames } from '/data/global/names.js'

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
      src: '/audio/throw.mp3',
    })

    this.backgroundAudio = createElementFn({
      element: 'audio',
      src: '/audio/background.mp3',
    })

    this.finishAudio = createElementFn({
      element: 'audio',
      src: '/audio/finish.mp3',
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
              this.removeActive(this.charButtons)
              this.setActive(e.target)
            },
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: 'button',
      textContent: 'Porozmawiaj',
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

    return [this.headline, ...this.charButtons, this.startButton]
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

  removeActive(elements) {
    elements.map((element) =>
      element.classList.remove(classNames.selectCharUI.activeBtn)
    )
  }

  getCharButtons() {
    return this.charButtons
  }

  setActive(element) {
    element.classList.add(classNames.selectCharUI.activeBtn)
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}

export default SelectCharUI
