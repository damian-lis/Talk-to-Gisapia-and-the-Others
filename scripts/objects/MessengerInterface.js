import {
  createElementFn,
  appendElementsToContainerFn,
  changeLanguageFn,
  setPropsFn,
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
    this.inputValue = ''
    this.subscribers = []

    this.createElements()
    this.createLists()
    this.memoryLngSubscribe()

    appendElementsToContainerFn(this.allElementsList, this.containerSent)
  }

  memoryLngSubscribe() {
    this.memory.lngSubscribe((lng) =>
      changeLanguageFn(
        [
          {
            element: this.button,
            props: {
              name: 'textContent',
              value: commands.send,
            },
          },
        ],
        lng
      )
    )
  }

  createElements() {
    const lng = this.memory.getLanguage()

    this.input = createElementFn({
      element: common.elements.input,
      disabled: true,
      classes: [classNames.messenger.interfaceInput],
      listeners: [
        {
          event: common.elements.input,
          cb: (e) => (this.inputValue = e.target.value),
        },
        {
          event: common.events.keypress,
          cb: (e) => this.handleInputKeypress(e),
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
          cb: () => this.handleButtonClick(),
        },
      ],
    })

    this.spinner = this.createSpinner()
  }

  handleInputKeypress(e) {
    if (e.key === common.keys.Enter) {
      if (this.isCorrectInputValue()) {
        this.callSubscribers()
      }
    }
  }

  handleButtonClick() {
    if (this.isCorrectInputValue()) {
      this.callSubscribers()
    }
  }

  createSpinner() {
    const formSpinnerContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.spinnerContainer],
    })

    const formSpinner = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.spinner],
    })

    formSpinnerContainer.appendChild(formSpinner)

    return formSpinnerContainer
  }

  createLists() {
    this.allElementsList = [this.input, this.button, this.spinner]
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

  toggleActivePanel(toggle) {
    setPropsFn([
      {
        elements: [this.button],
        styleProps: [
          {
            name: 'pointerEvents',
            value:
              toggle === common.toggle.on
                ? common.styleProps.values.auto
                : common.styleProps.values.none,
          },
          ,
        ],
      },
      {
        elements: [this.input, this.button],
        props: [
          {
            name: 'disabled',
            value: toggle === common.toggle.on ? false : true,
          },
          ,
        ],
      },
    ])

    this.clearInput()
  }

  showSpinnerInsteadBtn({ invert } = false) {
    setPropsFn([
      {
        elements: [this.button],
        styleProps: [
          {
            name: 'display',
            value: invert ? 'block' : 'none',
          },
          ,
        ],
      },
      {
        elements: [this.spinner],
        styleProps: [
          {
            name: 'display',
            value: invert ? 'none' : 'flex',
          },
          ,
        ],
      },
    ])
  }

  emailValidation(email) {
    return emailValidationReg.test(email)
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  callSubscribers() {
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
  }
}

export default MessengerInterface
