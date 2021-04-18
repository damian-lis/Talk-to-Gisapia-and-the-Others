import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import { classNames } from '/data/global/names.js'

class MessengerInterface {
  constructor(container) {
    this.containerSent = document.querySelector(container)
    const messengerInterfaceElements = this.createMessengerInterfaceElements()
    this.inputValue = ''
    this.subscribers = []

    appendElementsToContainerFn(messengerInterfaceElements, this.containerSent)
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
      styles: [{ name: 'pointerEvents', value: 'none' }],
      listeners: [
        {
          event: 'click',
          cb: () => this.checkInputAndCallSubscribers(),
        },
      ],
    })

    this.spinner = this.createSpinner()

    return [this.input, this.button, this.spinner]
  }

  emailValidation(email) {
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return reg.test(email)
  }

  checkInputAndCallSubscribers() {
    if (this.inputValue === '') return alert('Musisz coś napisać')
    if (this.inputValue.includes('@')) {
      if (!this.emailValidation(this.inputValue))
        return alert('Podaj właściwy format maila')
    }
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
  }

  deactivatePanel() {
    this.input.disabled = true
    this.button.disabled = true
    this.button.style.pointerEvents = 'none'
    this.clearInput()
  }

  activatePanel() {
    this.input.disabled = false
    this.button.disabled = false
    this.button.style.pointerEvents = 'auto'
  }

  clearInput() {
    this.input.value = ''
    this.inputValue = ''
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  addWaitTextToInput() {
    this.input.value = 'Wysyłam, cierpliwości! 😎'
  }

  createSpinner() {
    this.formSpinnerContainer = createElementFn({
      element: 'div',
      classes: ['messenger-spinner-container'],
    })

    this.formSpinner = createElementFn({
      element: 'div',
      classes: ['messenger-spinner'],
    })

    this.formSpinnerContainer.appendChild(this.formSpinner)

    return this.formSpinnerContainer
  }

  showSpinnerInsteadBtn() {
    this.button.style.display = 'none'
    this.spinner.style.display = 'flex'
  }

  showBtnInsteadSpinner() {
    this.button.style.display = 'block'
    this.spinner.style.display = 'none'
  }
}

export default MessengerInterface
