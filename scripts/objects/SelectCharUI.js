import {
  createElementFn,
  appendElementsToContainerFn,
  changeLanguageFn,
  toggleReadyFn,
  setPropsFn,
  setClassesFn,
} from '/scripts/helpers/index.js'
import {
  animationSettings,
  classNames,
  commands,
  common,
  privacyPolicy,
  language,
  styleProps,
  elementProps,
  elements,
  events,
  src,
} from '/data/names.js'

class SelectCharUI {
  constructor(charNames, container, memory) {
    this.charNames = charNames
    this.memory = memory
    this.subscribers = {}

    this.createElements()
    this.createComponents()
    this.memoryLngSubscribe()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container: document.querySelector(container),
    })
  }

  createElements() {
    const lng = this.memory.getLanguage()

    this.container = createElementFn({
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

    this.plLngBtn = createElementFn({
      element: elements.button,
      textContent: language.pl.large,
      disabled: lng === language.pl.small ? true : false,
      classes:
        lng === language.pl.small
          ? [
              classNames.selectCharUI.plLngBtn,
              classNames.selectCharUI.lngBtnActive,
            ]
          : [classNames.selectCharUI.plLngBtn],

      listeners: [
        {
          event: events.click,
          cb: (e) =>
            this.handleLngButtonsClick({
              lng: language.pl.small,
              target: e.target,
            }),
        },
      ],
    })
    this.engLngBtn = createElementFn({
      element: elements.button,
      textContent: language.eng.large,
      disabled: lng === language.eng.small ? true : false,
      classes:
        lng === language.eng.small
          ? [
              classNames.selectCharUI.engLngBtn,
              classNames.selectCharUI.lngBtnActive,
            ]
          : [classNames.selectCharUI.engLngBtn],

      listeners: [
        {
          event: events.click,
          cb: (e) =>
            this.handleLngButtonsClick({
              lng: language.eng.small,
              target: e.target,
            }),
        },
      ],
    })

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
        this.plLngBtn,
        this.engLngBtn,
        this.headline,
        ...this.charButtons,
        this.startButton,
        this.talkAgainButton,
        this.privacyPolicyComponent,
      ],
      container: this.container,
    })
  }

  handleCharButtonsClick({ target, charName }) {
    setClassesFn({
      objs: [
        {
          elements: [target],
          removeFromEls: this.charButtons,
          classes: [classNames.selectCharUI.selectBtnActive],
        },
      ],
    })
    this.callSubscribers({
      type: common.selectChar,
      element: charName[1],
    })
    this.memory.playClickAudio()
  }

  handleStartButtonClick() {
    this.memory.playFallDownAudio()
    this.memory.playBackgroundAudio()
    this.memory.playClickAudio()
    this.callSubscribers({ type: common.startTalking })
  }

  handleTalkAgainButtonClick() {
    this.memory.restart()
    this.memory.playFinishAudio({ pause: true, reload: true })
    this.memory.playBackgroundAudio({ reload: true })
    this.memory.playClickAudio()
    this.messagesComponent.remove()

    this.changeUI()
    this.removeCharButtonsActive()
    this.toggleReadyStartCharTalkingBtn(common.off)
  }

  handleLngButtonsClick({ lng, target }) {
    this.memory.setLanguage(lng)
    this.memory.callLngSubscribers()
    this.memory.playClickAudio()

    setClassesFn({
      objs: [
        {
          elements: [target],
          removeFromEls: [this.engLngBtn, this.plLngBtn],
          classes: [classNames.selectCharUI.lngBtnActive],
        },
      ],
    })
  }

  createMessagesComponent(messages) {
    const lng = this.memory.getLanguage()
    const msgsInCorrectLng = messages[lng]
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
      changeLanguageFn({
        objs: [
          {
            element: this.headline,
            props: {
              name: elementProps.names.textContent,
              value: commands.chooseCharacter,
            },
          },
          {
            element: this.startButton,
            props: {
              name: elementProps.names.textContent,
              value: commands.startTalking,
            },
          },
          {
            element: this.talkAgainButton,
            props: {
              name: elementProps.names.textContent,
              value: commands.talkAgain,
            },
          },
          {
            element: this.privacyPolicyLink,
            props: {
              name: elementProps.names.textContent,
              value: privacyPolicy,
            },
          },
        ],
        lng,
      })
    )
  }

  toggleReadyStartCharTalkingBtn(toggle) {
    toggleReadyFn({
      toggle,
      elements: [this.startButton],
      classes: [classNames.selectCharUI.startBtnReady],
    })
  }

  changeUI({ messages } = '') {
    if (messages) {
      this.messagesComponent = this.createMessagesComponent(messages)
      this.container.prepend(this.messagesComponent)
    }
    setPropsFn({
      objs: [
        {
          elements: [...this.charButtons, this.startButton, this.headline],
          styleProps: [
            {
              name: styleProps.names.display,
              value: messages
                ? styleProps.values.none
                : styleProps.values.block,
            },
          ],
        },
        {
          elements: [this.talkAgainButton],
          styleProps: [
            {
              name: styleProps.names.display,
              value: messages
                ? styleProps.values.block
                : styleProps.values.none,
            },
          ],
        },
        {
          elements: [this.engLngBtn, this.plLngBtn],
          styleProps: [
            {
              name: styleProps.names.display,
              value: messages
                ? styleProps.values.none
                : styleProps.values.block,
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
          elements: [this.container],
          styleProps: [
            {
              name: common.animation,
              value:
                type === common.toBottomHide
                  ? animationSettings.selectCharUI.toBottomHide
                  : animationSettings.selectCharUI.fromBottomShow,
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
          removeFromEls: this.charButtons,
          classes: [classNames.selectCharUI.selectBtnActive],
        },
      ],
    })
  }

  getCharButtons() {
    return this.charButtons
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }

  callSubscribers({ type, element = null }) {
    element ? this.subscribers[type](element) : this.subscribers[type]()
  }
}

export default SelectCharUI
