import {
  createElementFn,
  appendElementsToContainerFn,
  changeLanguageFn,
  setPropsFn,
  setClassesFn,
} from '/scripts/helpers/index.js'
import {
  classNames,
  commands,
  alerts,
  messages,
  common,
  events,
  styleProps,
  elementProps,
  elements,
  emailValidationReg,
} from '/data/names.js'

class MessengerInterface {
  constructor(messenger, memory) {
    this.memory = memory
    this.inputValue = ''
    this.subscribers = []

    this.createElements()
    this.createComponents()
    this.memoryLngSubscribe()

    appendElementsToContainerFn(
      [this.mainComponent],
      messenger.getContainerInner()
    )
  }

  createElements() {
    const lng = this.memory.getLanguage()

    this.container = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.interface],
    })

    this.input = createElementFn({
      element: elements.input,
      disabled: true,
      classes: [classNames.messenger.interfaceInput],
      listeners: [
        {
          event: elements.input,
          cb: (e) => (this.inputValue = e.target.value),
        },
        {
          event: events.keypress,
          cb: (e) => this.handleInputKeypress(e),
        },
      ],
    })

    this.button = createElementFn({
      element: elements.button,
      textContent: commands.send[lng],
      disabled: true,
      classes: [classNames.messenger.interfaceBtn],
      styles: [
        {
          name: styleProps.names.pointerEvents,
          value: styleProps.values.none,
        },
      ],
      listeners: [
        {
          event: events.click,
          cb: () => this.handleButtonClick(),
        },
      ],
    })

    this.spinnerContainer = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.spinnerContainer],
    })

    this.spinner = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.spinner],
    })
  }

  createComponents() {
    this.spinnerComponent = appendElementsToContainerFn(
      [this.spinner],
      this.spinnerContainer
    )

    this.mainComponent = appendElementsToContainerFn(
      [this.input, this.button, this.spinnerComponent],
      this.container
    )
  }

  handleInputKeypress(e) {
    if (e.key === common.Enter) {
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

  memoryLngSubscribe() {
    this.memory.lngSubscribe((lng) =>
      changeLanguageFn(
        [
          {
            element: this.button,
            props: {
              name: elementProps.names.textContent,
              value: commands.send,
            },
          },
        ],
        lng
      )
    )
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
            name: styleProps.names.pointerEvents,
            value:
              toggle === common.on
                ? styleProps.values.auto
                : styleProps.values.none,
          },
          ,
        ],
      },
      {
        elements: [this.input, this.button],
        props: [
          {
            name: elementProps.names.disabled,
            value: toggle === common.on ? false : true,
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
            name: styleProps.names.display,
            value: invert ? styleProps.values.block : styleProps.values.none,
          },
          ,
        ],
      },
      {
        elements: [this.spinnerComponent],
        styleProps: [
          {
            name: styleProps.names.display,
            value: invert ? styleProps.values.none : styleProps.values.flex,
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

  changeColor(chosenChar) {
    setClassesFn([
      {
        elements: [this.button],
        initialClass: classNames.messenger.interfaceBtn,
        classesToAdd: [`${chosenChar.name.toLowerCase()}-${common.second}`],
      },
      {
        elements: [this.input],
        initialClass: classNames.messenger.interfaceInput,
        classesToAdd: [`${chosenChar.name.toLowerCase()}-${common.second}`],
      },
      {
        elements: [this.spinnerContainer],
        initialClass: classNames.messenger.spinnerContainer,
        classesToAdd: [`${chosenChar.name.toLowerCase()}-${common.second}`],
      },
    ])
  }
}

export default MessengerInterface
