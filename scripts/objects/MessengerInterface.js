import { createElementFn, appendElementsToContainer } from '../helpers/index.js'
import { classNames } from '../../data/globalNames.js'

class MessengerInterface {
  constructor(container) {
    const containerSent = document.querySelector(container)
    const messengerInterfaceElements = this.createMessengerInterfaceElements()
    this.inputValue = ''
    this.subscribers = []

    appendElementsToContainer(messengerInterfaceElements, containerSent)
  }

  createMessengerInterfaceElements() {
    this.input = createElementFn({
      element: 'input',
      disabled: true,
      classes: [classNames.messenger.interfaceInput],
      listeners: [
        {
          event: 'input',
          cb: (e) => {
            this.inputValue = e.target.value
          },
        },
        {
          event: 'keypress',
          cb: (e) => {
            if (e.key === 'Enter') {
              this.checkInputAndCallSubscribers()
            }
          },
        },
      ],
    })

    this.button = createElementFn({
      element: 'button',
      textContent: 'Wyślij',
      disabled: true,
      classes: [classNames.messenger.interfaceBtn],
      listeners: [
        {
          event: 'click',
          cb: () => this.checkInputAndCallSubscribers(),
        },
      ],
    })

    return [this.input, this.button]
  }

  checkInputAndCallSubscribers() {
    if (this.inputValue === '') return alert('Musisz coś napisać')
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
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
    this.inputValue = ''
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}

export default MessengerInterface
