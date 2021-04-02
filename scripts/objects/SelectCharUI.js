import { createElementFn, appendElementsToContainer } from '../helpers/index.js'

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
    })

    this.charButtons = Object.entries(charNames).map((charName) =>
      createElementFn({
        element: 'button',
        textContent: charName[1],
        classes: ['selectChar'],
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
      classes: ['startTalking'],
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
    elements.map((element) => element.classList.remove('active'))
  }

  getCharButtons() {
    return this.charButtons
  }

  setActive(element) {
    element.classList.add('active')
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}

export default SelectCharUI
