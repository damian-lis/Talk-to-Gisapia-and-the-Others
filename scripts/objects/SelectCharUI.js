import { createElementFn, appendElementsToContainer } from '../helpers/index.js'
import { classNames } from '../../data/globalNames.js'

class SelectCharUI {
  constructor(charNames, container) {
    this.containerSent = document.querySelector(container)
    const selectCharUIElements = this.createSelectCharUIElements(charNames)
    this.subscribers = {}

    appendElementsToContainer(selectCharUIElements, this.containerSent)
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
            this.subscribers['startTalking']()
          },
        },
      ],
    })

    return [this.headline, ...this.charButtons, this.startButton]
  }

  createMessagesComponent(messages) {
    const msgContainer = createElementFn({
      element: 'div',
    })

    messages.map((message) => {
      const msg = createElementFn({
        element: 'p',
        textContent: message,
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
