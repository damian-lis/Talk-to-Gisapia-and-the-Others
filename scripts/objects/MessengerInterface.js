import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import {
  classNames,
  commands,
  alerts,
  messages,
  common,
  emailValidationReg,
} from '/data/main.js'

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
    const lng = this.memory.getLanguage()
    this.input = createElementFn({
      element: common.elements.input,
      disabled: true,
      classes: [classNames.messenger.interfaceInput],
      listeners: [
        {
          event: common.elements.input,
          cb: (e) => {
            this.inputValue = e.target.value
          },
        },
        {
          event: common.events.keypress,
          cb: (e) => {
            if (e.key === common.keys.Enter) {
              if (this.isCorrectInputValue()) {
                this.callSubscribers()
              }
            }
          },
        },
      ],
    })

    this.button = createElementFn({
      element: common.elements.button,
      textContent: commands.send[lng],
      disabled: true,
      classes: [classNames.messenger.interfaceBtn],
      styles: [
        {
          name: common.styleProps.names.pointerEvents,
          value: common.styleProps.values.none,
        },
      ],
      listeners: [
        {
          event: common.events.click,
          cb: () => {
            if (this.isCorrectInputValue()) {
              this.callSubscribers()
            }
          },
        },
      ],
    })

    this.spinner = this.createSpinner()

    return [this.input, this.button, this.spinner]
  }

  emailValidation(email) {
    return emailValidationReg.test(email)
  }

  isCorrectInputValue() {
    const lng = this.memory.getLanguage()
    if (this.inputValue === '') {
      return alert(alerts.mustWritingSomething[lng])
    }
    if (this.inputValue.includes('@')) {
      if (!this.emailValidation(this.inputValue))
        return alert(alerts.correctMailFormat[lng])
    }

    return true
  }

  callSubscribers() {
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
  }

  toggleActivePanel(toggle) {
    this.input.disabled = toggle === common.toggle.on ? false : true
    this.button.disabled = toggle === common.toggle.on ? false : true
    this.button.style.pointerEvents =
      toggle === common.toggle.on
        ? common.styleProps.values.auto
        : common.styleProps.values.none
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
    if (this.thirdInputTimeout) {
      clearTimeout(this.thirdInputTimeout)
    }
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  addWaitMessagesToInput({ firstDelay, secondDelay, thirdDelay }) {
    const lng = this.memory.getLanguage()
    this.firstInputTimeout = setTimeout(() => {
      this.input.value = messages.sending[lng]
    }, firstDelay)

    this.secondInputTimeout = setTimeout(() => {
      this.input.value = messages.oneMoreMoment[lng]
    }, secondDelay)

    this.thirdInputTimeout = setTimeout(() => {
      this.input.value = messages.secondMoreMoment[lng]
    }, thirdDelay)
  }

  changeLanguage(lng) {
    this.button.textContent = commands.send[lng]
  }

  createSpinner() {
    this.formSpinnerContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.spinnerContainer],
    })

    this.formSpinner = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.spinner],
    })

    this.formSpinnerContainer.appendChild(this.formSpinner)

    return this.formSpinnerContainer
  }

  showSpinnerInsteadBtn() {
    this.button.style.display = common.styleProps.values.none
    this.spinner.style.display = common.styleProps.values.flex
  }

  showBtnInsteadSpinner() {
    this.button.style.display = common.styleProps.values.block
    this.spinner.style.display = common.styleProps.values.none
  }
}

export default MessengerInterface
