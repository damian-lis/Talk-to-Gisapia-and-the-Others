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
      element: common.elements.div,
      classes: [classNames.messenger.interface],
    })

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

    this.spinnerContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.spinnerContainer],
    })

    this.spinner = createElementFn({
      element: common.elements.div,
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

  memoryLngSubscribe() {
    this.memory.lngSubscribe((lng) =>
      changeLanguageFn(
        [
          {
            element: this.button,
            props: {
              name: common.props.names.textContent,
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
            name: common.styleProps.names.pointerEvents,
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
            name: common.props.names.disabled,
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
            name: common.styleProps.names.display,
            value: invert
              ? common.styleProps.values.block
              : common.styleProps.values.none,
          },
          ,
        ],
      },
      {
        elements: [this.spinnerComponent],
        styleProps: [
          {
            name: common.styleProps.names.display,
            value: invert
              ? common.styleProps.values.none
              : common.styleProps.values.flex,
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
