import {
  createElementFn,
  appendElementsToContainerFn,
  setPropsFn,
  setClassesFn,
} from '/scripts/helpers/index.js'
import {
  classNames,
  commands,
  common,
  privacyPolicy,
  languages,
  styleProps,
  elementProps,
  elements,
  events,
  src,
  size,
  toggleValue,
  subscriberNames,
} from '/data/names.js'

class SelectCharUI {
  constructor({ container, charNames, objects }) {
    this.charNames = charNames
    this.memory = objects.memory
    this.subscribers = {}

    this.createElements()
    this.createComponents()
    this.memoryLngSubscribe()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container,
    })
  }

  createElements() {
    const lng = this.memory.getLanguage()

    this.mainContainer = createElementFn({
      element: elements.div,
      classes: [classNames.selectCharUI.main],
    })

    this.headline = createElementFn({
      element: elements.h1,
      textContent: commands.chooseCharacter[lng],
      classes: [classNames.selectCharUI.headline],
    })

    this.charButtons = Object.entries(this.charNames).map((charName) =>
      createElementFn({
        element: elements.button,
        textContent: charName[1],
        classes: [classNames.selectCharUI.selectBtn],
        listeners: [
          {
            event: events.click,
            cb: (e) =>
              this.handleCharButtonsClick({ target: e.target, charName }),
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: elements.button,
      textContent: commands.startTalking[lng],
      disabled: true,
      classes: [classNames.selectCharUI.startBtn],
      listeners: [
        {
          event: events.click,
          cb: () => this.handleStartButtonClick(),
        },
      ],
    })

    this.talkAgainButton = createElementFn({
      element: elements.button,
      textContent: commands.talkAgain[lng],
      classes: [
        classNames.selectCharUI.startBtn,
        classNames.selectCharUI.startBtnReady,
      ],
      styles: [
        {
          name: styleProps.names.display,
          value: styleProps.values.none,
        },
      ],
      listeners: [
        {
          event: events.click,
          cb: () => this.handleTalkAgainButtonClick(),
        },
      ],
    })

    this.lngButtons = Object.entries(languages).map((language) =>
      createElementFn({
        element: elements.button,
        textContent: languages[language[0]][size.large],
        disabled: lng === languages[language[0]][size.small] ? true : false,
        classes:
          lng === languages[language[0]][size.small]
            ? [
                classNames.selectCharUI[`${language[0]}LngBtn`],
                classNames.selectCharUI.lngBtnActive,
              ]
            : [classNames.selectCharUI[`${language[0]}LngBtn`]],

        listeners: [
          {
            event: events.click,
            cb: (e) =>
              this.handleLngButtonsClick({
                lng: languages[language[0]][size.small],
                target: e.target,
              }),
          },
        ],
      })
    )

    this.privacyPolicyLinkContainer = createElementFn({
      element: elements.div,
      classes: [classNames.privacyPolicy.linkContainer],
    })

    this.privacyPolicyLink = createElementFn({
      element: elements.a,
      textContent: privacyPolicy[lng],
      href: src.privacyPolicy.site,
      classes: [classNames.privacyPolicy.link],
    })
  }

  createComponents() {
    this.privacyPolicyComponent = appendElementsToContainerFn({
      elements: [this.privacyPolicyLink],
      container: this.privacyPolicyLinkContainer,
    })

    this.mainComponent = appendElementsToContainerFn({
      elements: [
        ...this.lngButtons,
        this.headline,
        ...this.charButtons,
        this.startButton,
        this.talkAgainButton,
        this.privacyPolicyComponent,
      ],
      container: this.mainContainer,
    })
  }

  handleCharButtonsClick({ target, charName }) {
    setClassesFn({
      objs: [
        {
          elements: [target],
          removeFromElements: this.charButtons,
          classes: [classNames.selectCharUI.selectBtnActive],
        },
      ],
    })

    this.callSubscribers({
      subscriberName: subscriberNames.selectChar,
      charName: charName[1],
    })

    this.memory.playClickAudio()
  }

  handleStartButtonClick() {
    this.memory.playFallDownAudio()
    this.memory.playBackgroundAudio()
    this.memory.playClickAudio()
    this.callSubscribers({ subscriberName: subscriberNames.startTalking })
  }

  handleTalkAgainButtonClick() {
    this.memory.restart()
    this.memory.playFinishAudio({ pause: true, reload: true })
    this.memory.playBackgroundAudio({ reload: true })
    this.memory.playClickAudio()
    this.messagesComponent.remove()

    this.changeUI()
    this.removeCharButtonsActive()
    this.toggleReadyStartCharTalkingBtn(toggleValue.off)
  }

  handleLngButtonsClick({ lng, target }) {
    this.memory.setLanguage(lng)
    this.memory.callLngSubscribers()
    this.memory.playClickAudio()

    setClassesFn({
      objs: [
        {
          elements: [target],
          removeFromElements: this.lngButtons,
          classes: [classNames.selectCharUI.lngBtnActive],
        },
      ],
    })
  }

  createMessageComponent({ message: msg }) {
    const lng = this.memory.getLanguage()
    const msgsInCorrectLng = msg[lng]
    const msgContainer = createElementFn({
      element: elements.div,
      classes: [classNames.selectCharUI.messageContainer],
    })

    msgsInCorrectLng.map((message) => {
      const msg = createElementFn({
        element: elements.p,
        innerHTML: message,
        classes: [classNames.selectCharUI.message],
      })
      msgContainer.appendChild(msg)
    })

    return msgContainer
  }

  memoryLngSubscribe() {
    this.memory.lngSubscribe((lng) =>
      setPropsFn({
        objs: [
          {
            elements: [this.headline],
            props: [
              {
                name: elementProps.names.textContent,
                value: commands.chooseCharacter[lng],
              },
            ],
          },
          {
            elements: [this.startButton],
            props: [
              {
                name: elementProps.names.textContent,
                value: commands.startTalking[lng],
              },
            ],
          },
          {
            elements: [this.talkAgainButton],
            props: [
              {
                name: elementProps.names.textContent,
                value: commands.talkAgain[lng],
              },
            ],
          },
          {
            elements: [this.privacyPolicyLink],
            props: [
              {
                name: elementProps.names.textContent,
                value: privacyPolicy[lng],
              },
            ],
          },
        ],
      })
    )
  }

  toggleReadyStartCharTalkingBtn(toggle) {
    setClassesFn({
      toggle,
      objs: [
        {
          elements: [this.startButton],
          classes: [classNames.selectCharUI.startBtnReady],
        },
      ],
    })
  }

  changeUI({ message } = '') {
    if (message) {
      this.messagesComponent = this.createMessageComponent({ message })
      this.mainContainer.prepend(this.messagesComponent)
    }

    setPropsFn({
      objs: [
        {
          elements: [...this.charButtons, this.startButton, this.headline],
          styleProps: [
            {
              name: styleProps.names.display,
              value: message ? styleProps.values.none : styleProps.values.block,
            },
          ],
        },
        {
          elements: [this.talkAgainButton],
          styleProps: [
            {
              name: styleProps.names.display,
              value: message ? styleProps.values.block : styleProps.values.none,
            },
          ],
        },
        {
          elements: this.lngButtons,
          styleProps: [
            {
              name: styleProps.names.display,
              value: message ? styleProps.values.none : styleProps.values.block,
            },
          ],
        },
      ],
    })
  }

  move({ type }) {
    setPropsFn({
      objs: [
        {
          elements: [this.mainContainer],
          styleProps: [
            {
              name: common.animation,
              value: type,
            },
          ],
        },
      ],
    })
  }

  removeCharButtonsActive() {
    setClassesFn({
      objs: [
        {
          removeFromElements: this.charButtons,
          classes: [classNames.selectCharUI.selectBtnActive],
        },
      ],
    })
  }

  getCharButtons() {
    return this.charButtons
  }

  subscribe({ subscriber, subscriberName }) {
    console.log(subscriberName)
    this.subscribers[subscriberName] = subscriber
  }

  callSubscribers({ subscriberName, charName = null }) {
    charName
      ? this.subscribers[subscriberName](charName)
      : this.subscribers[subscriberName]()
  }
}

export default SelectCharUI
