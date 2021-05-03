import {
  createElementFn,
  appendElementsToContainerFn,
  changeLanguageFn,
  toggleReadyFn,
  setActiveFn,
  setPropsFn,
} from '/scripts/helpers/index.js'
import {
  animationSettings,
  classNames,
  commands,
  common,
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

    appendElementsToContainerFn(
      [this.mainComponent],
      document.querySelector(container)
    )
  }

  createElements() {
    const lng = this.memory.getLanguage()

    this.container = createElementFn({
      element: common.elements.div,
      classes: [classNames.selectCharUI.main],
    })

    this.headline = createElementFn({
      element: common.elements.h1,
      textContent: commands.chooseCharacter[lng],
      classes: [classNames.selectCharUI.headline],
    })

    this.charButtons = Object.entries(this.charNames).map((charName) =>
      createElementFn({
        element: common.elements.button,
        textContent: charName[1],
        classes: [classNames.selectCharUI.selectBtn],
        listeners: [
          {
            event: common.events.click,
            cb: (e) =>
              this.handleCharButtonsClick({ target: e.target, charName }),
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: common.elements.button,
      textContent: commands.startTalking[lng],
      disabled: true,
      classes: [classNames.selectCharUI.startBtn],
      listeners: [
        {
          event: common.events.click,
          cb: () => this.handleStartButtonClick(),
        },
      ],
    })

    this.talkAgainButton = createElementFn({
      element: common.elements.button,
      textContent: commands.talkAgain[lng],
      classes: [
        classNames.selectCharUI.startBtn,
        classNames.selectCharUI.startBtnReady,
      ],
      styles: [
        {
          name: common.styleProps.names.display,
          value: common.styleProps.values.none,
        },
      ],
      listeners: [
        {
          event: common.events.click,
          cb: () => this.handletalkAgainButtonClick(),
        },
      ],
    })

    this.plLngBtn = createElementFn({
      element: common.elements.button,
      textContent: common.language.pl.large,
      disabled: lng === common.language.pl.small ? true : false,
      classes:
        lng === common.language.pl.small
          ? [
              classNames.selectCharUI.plLngBtn,
              classNames.selectCharUI.lngBtnActive,
            ]
          : [classNames.selectCharUI.plLngBtn],

      listeners: [
        {
          event: common.events.click,
          cb: (e) =>
            this.handleLngButtonsClick({
              lng: common.language.pl.small,
              target: e.target,
            }),
        },
      ],
    })
    this.engLngBtn = createElementFn({
      element: common.elements.button,
      textContent: common.language.eng.large,
      disabled: lng === common.language.eng.small ? true : false,
      classes:
        lng === common.language.eng.small
          ? [
              classNames.selectCharUI.engLngBtn,
              classNames.selectCharUI.lngBtnActive,
            ]
          : [classNames.selectCharUI.engLngBtn],

      listeners: [
        {
          event: common.events.click,
          cb: (e) =>
            this.handleLngButtonsClick({
              lng: common.language.eng.small,
              target: e.target,
            }),
        },
      ],
    })

    this.privatePolicyLinkContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.privatePolicy.linkContainer],
    })

    this.privatePolicyLink = createElementFn({
      element: common.elements.a,
      textContent: common.privatePolicy[lng],
      href: src.privatePolicy.site,
      classes: [classNames.privatePolicy.link],
    })
  }

  createComponents() {
    this.privatePolicyComponent = appendElementsToContainerFn(
      [this.privatePolicyLink],
      this.privatePolicyLinkContainer
    )

    this.mainComponent = appendElementsToContainerFn(
      [
        this.plLngBtn,
        this.engLngBtn,
        this.headline,
        ...this.charButtons,
        this.startButton,
        this.talkAgainButton,
        this.privatePolicyComponent,
      ],
      this.container
    )
  }

  handleCharButtonsClick({ target, charName }) {
    setActiveFn({
      setOn: target,
      removeFrom: this.charButtons,
      classes: [classNames.selectCharUI.selectBtnActive],
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

  handletalkAgainButtonClick() {
    this.memory.restart()
    this.memory.playFinishAudio({ pause: true, reload: true })
    this.memory.playBackgroundAudio({ reload: true })
    this.memory.playClickAudio()
    this.messagesComponent.remove()

    this.changeUI()
    this.removeCharButtonsActive()
    this.toggleReadyStartCharTalkingBtn(common.toggle.off)
  }

  handleLngButtonsClick({ lng, target }) {
    this.memory.setLanguage(lng)
    this.memory.callLngSubscribers()
    this.memory.playClickAudio()

    setActiveFn({
      setOn: target,
      removeFrom: [this.engLngBtn, this.plLngBtn],
      classes: [classNames.selectCharUI.lngBtnActive],
    })
  }

  createMessagesComponent(messages) {
    const lng = this.memory.getLanguage()
    const msgsInCorrectLng = messages[lng]
    const msgContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.selectCharUI.messageContainer],
    })

    msgsInCorrectLng.map((message) => {
      const msg = createElementFn({
        element: common.elements.p,
        innerHTML: message,
        classes: [classNames.selectCharUI.message],
      })
      msgContainer.appendChild(msg)
    })

    return msgContainer
  }

  memoryLngSubscribe() {
    this.memory.lngSubscribe((lng) =>
      changeLanguageFn(
        [
          {
            element: this.headline,
            props: {
              name: common.props.names.textContent,
              value: commands.chooseCharacter,
            },
          },
          {
            element: this.startButton,
            props: {
              name: common.props.names.textContent,
              value: commands.startTalking,
            },
          },
          {
            element: this.talkAgainButton,
            props: {
              name: common.props.names.textContent,
              value: commands.talkAgain,
            },
          },
          {
            element: this.privatePolicyLink,
            props: {
              name: common.props.names.textContent,
              value: common.privatePolicy,
            },
          },
        ],
        lng
      )
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
    setPropsFn([
      {
        elements: [...this.charButtons, this.startButton, this.headline],
        styleProps: [
          {
            name: common.styleProps.names.display,
            value: messages
              ? common.styleProps.values.none
              : common.styleProps.values.block,
          },
        ],
      },
      {
        elements: [this.talkAgainButton],
        styleProps: [
          {
            name: common.styleProps.names.display,
            value: messages
              ? common.styleProps.values.block
              : common.styleProps.values.none,
          },
        ],
      },
      {
        elements: [this.engLngBtn, this.plLngBtn],
        styleProps: [
          {
            name: common.styleProps.names.display,
            value: messages
              ? common.styleProps.values.none
              : common.styleProps.values.block,
          },
        ],
      },
    ])
  }

  move({ type }) {
    setPropsFn([
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
    ])
  }

  removeCharButtonsActive() {
    setActiveFn({
      removeFrom: this.charButtons,
      classes: [classNames.selectCharUI.selectBtnActive],
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
