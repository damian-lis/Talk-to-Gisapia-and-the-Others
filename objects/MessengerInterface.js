import { buttons } from '../../data/globalNames.js'
import { createElementFn, runAlertOrForEachFn } from '../../helpers/index.js'

export default class MessengerInterface {
  constructor(container) {
    this.input = this.createInput()
    this.button = this.createButton()
    this.attachToContainer(container, this.input, this.button)
    this.inputMessage = ''
    this.subscribers = []
  }

  createInput() {
    const input = createElementFn({
      elementToCreate: 'input',
      disabled: true,
      classesName: ['interface-input'],
    })

    const events = ['input', 'keypress']
    events.map((event) => {
      input.addEventListener(event, (e) => {
        if (event === 'input') {
          this.inputMessage = e.target.value
        } else {
          if (e.key === 'Enter') {
            runAlertOrForEachFn({
              elements: this.subscribers,
              alertMessage: 'Musisz coś napisać!',
              toSendInFn: this.inputMessage,
            })
          }
        }
      })
    })

    return input
  }

  createButton() {
    const button = createElementFn({
      elementToCreate: 'button',
      text: buttons.names.send,
      disabled: true,
      classesName: ['interface-btn'],
    })

    button.addEventListener('click', () => {
      runAlertOrForEachFn({
        elements: this.subscribers,
        alertMessage: 'Musisz coś napisać',
        toSendInFn: this.inputMessage,
      })
    })

    return button
  }

  appendToRoot(root, ...elements) {
    elements.map((element) => root.appendChild(element))
  }

  attachToContainer(container, ...elements) {
    elements.map((element) =>
      document.querySelector(container).appendChild(element)
    )
  }

  deactivatePanel() {
    this.input.disabled = true
    this.button.disabled = true
    this.clearInput()
  }

  activatePanel() {
    this.input.disabled = false
    this.button.disabled = false
  }

  clearInput() {
    this.input.value = ''
    this.inputMessage = ''
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
