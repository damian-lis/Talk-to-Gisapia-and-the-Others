import {
  createElementFn,
  appendElementsToContainerFn,
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
  constructor({ container, objects }) {
    this.memory = objects.memory
    this.inputValue = ''
    this.subscribers = []
    this.delayMessagesTimeouts = []

    this.createElements()
    this.createComponents()
    this.memoryLngSubscribe()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container: container.getMainContainerInner(),
    })
  }

  createElements() {
    const lng = this.memory.getLanguage()

    this.mainContainer = createElementFn({
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
          cb: (e) => this.handleInputTyping(e),
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
    this.spinnerComponent = appendElementsToContainerFn({
      elements: [this.spinner],
      container: this.spinnerContainer,
    })

    this.mainComponent = appendElementsToContainerFn({
      elements: [this.input, this.button, this.spinnerComponent],
      container: this.mainContainer,
    })
  }

  handleInputTyping(e) {
    this.inputValue = e.target.value
  }

  handleInputKeypress(e) {
    e.key === common.Enter &&
      this.isCorrectInputValue() &&
      this.callSubscribers()
  }

  handleButtonClick() {
    this.isCorrectInputValue() && this.callSubscribers()
  }

  memoryLngSubscribe() {
    this.memory.lngSubscribe((lng) =>
      setPropsFn({
        objs: [
          {
            elements: [this.button],
            props: [
              {
                name: elementProps.names.textContent,
                value: commands.send[lng],
              },
            ],
          },
        ],
      })
    )
  }

  isCorrectInputValue() {
    const lng = this.memory.getLanguage()
    if (this.inputValue === '') return alert(alerts.mustWritingSomething[lng])

    if (
      this.inputValue.includes('@') &&
      !this.emailValidation({ email: this.inputValue })
    )
      return alert(alerts.correctMailFormat[lng])

    return true
  }

  clearInput({ withTimeouts } = false) {
    this.input.value = ''
    this.inputValue = ''
    withTimeouts && this.clearInputTimeouts()
  }

  // Tutaj

  clearInputTimeouts() {
    this.delayMessagesTimeouts.map((delayMessageTimeout) =>
      clearTimeout(delayMessageTimeout)
    )
  }

  addDelayMessagesToInput({ delay }) {
    const lng = this.memory.getLanguage()

    Object.entries(messages.delay).map((delayMessage, index) => {
      const delayMessageTimeout = setTimeout(
        () => (this.input.value = delayMessage[1][lng]),
        index === 0 ? 1000 : delay * index
      )

      this.delayMessagesTimeouts.push(delayMessageTimeout)
    })
  }

  toggleActivePanel(toggle) {
    setPropsFn({
      toggle,
      objs: [
        {
          elements: [this.button],
          styleProps: [
            {
              name: styleProps.names.pointerEvents,
              values: {
                on: styleProps.values.auto,
                off: styleProps.values.none,
              },
            },
            ,
          ],
        },
        {
          elements: [this.input, this.button],
          props: [
            {
              name: elementProps.names.disabled,
              values: { on: false, off: true },
            },
            ,
          ],
        },
      ],
    })

    this.clearInput()
  }

  showSpinnerInsteadBtn({ invert } = false) {
    setPropsFn({
      objs: [
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
      ],
    })
  }

  emailValidation({ email }) {
    return emailValidationReg.test(email)
  }

  subscribe({ subscriber }) {
    this.subscribers.push(subscriber)
  }

  callSubscribers() {
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
  }

  changeColor({ char }) {
    setClassesFn({
      objs: [
        {
          elements: [this.button],
          initialClass: classNames.messenger.interfaceBtn,
          classes: [`${char.name.toLowerCase()}-${common.second}`],
        },
        {
          elements: [this.input],
          initialClass: classNames.messenger.interfaceInput,
          classes: [`${char.name.toLowerCase()}-${common.second}`],
        },
        {
          elements: [this.spinnerContainer],
          initialClass: classNames.messenger.spinnerContainer,
          classes: [`${char.name.toLowerCase()}-${common.second}`],
        },
      ],
    })
  }
}

export default MessengerInterface
