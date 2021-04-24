import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import {
  classNames,
  send,
  mustWritingSomething,
  correctMailFormat,
  sending,
  oneMoreMoment,
} from '/data/global/names.js'

class MessengerInterface {
  constructor(container, memory) {
    this.containerSent = document.querySelector(container)
    this.memory = memory
    this.memory.lngSubscribe((lng) => this.changeLanguage(lng))
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
      textContent: send[this.memory.getLanguage()],
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
    if (this.inputValue === '')
      return alert(mustWritingSomething[this.memory.getLanguage()])
    if (this.inputValue.includes('@')) {
      if (!this.emailValidation(this.inputValue))
        return alert(correctMailFormat[this.memory.getLanguage()])
    }
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
  }

  toggleActivePanel(toggle) {
    this.input.disabled = toggle === 'on' ? false : true
    this.button.disabled = toggle === 'on' ? false : true
    this.button.style.pointerEvents = toggle === 'on' ? 'auto' : 'none'
    this.clearInput()
  }

  clearInput({ withTimeouts } = false) {
    this.input.value = ''
    this.inputValue = ''
    if (withTimeouts) {
      this.clearInputTimeouts()
    }
  }

  clearInputTimeouts() {
    if (this.firstInputTimeout) {
      clearTimeout(this.firstInputTimeout)
    }
    if (this.secondInputTimeout) {
      clearTimeout(this.secondInputTimeout)
    }
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  addWaitMessagesToInput({ firstDelay, secondDelay }) {
    this.firstInputTimeout = setTimeout(() => {
      this.input.value = sending[this.memory.getLanguage()]
    }, firstDelay)

    this.secondInputTimeout = setTimeout(() => {
      this.input.value = oneMoreMoment[this.memory.getLanguage()]
    }, secondDelay)
  }

  changeLanguage(lng) {
    this.button.textContent = send[lng]
  }

  createSpinner() {
    this.formSpinnerContainer = createElementFn({
      element: 'div',
      classes: [classNames.messenger.spinnerContainer],
    })

    this.formSpinner = createElementFn({
      element: 'div',
      classes: [classNames.messenger.spinner],
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
