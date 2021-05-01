import {
  createElementFn,
  appendElementsToContainerFn,
  changeLanguageFn,
  toggleReadyFn,
  setActiveFn,
  setPropsFn,
} from '/scripts/helpers/index.js'
import { classNames, commands, common, src } from '/data/main.js'

class SelectCharUI {
  constructor(charNames, container, memory) {
    this.containerSent = document.querySelector(container)
    this.charNames = charNames
    this.memory = memory
    this.subscribers = {}

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
            element: this.headline,
            props: {
              name: 'textContent',
              value: commands.chooseCharacter,
            },
          },
          {
            element: this.startButton,
            props: {
              name: 'textContent',
              value: commands.startTalking,
            },
          },
          {
            element: this.talkAgainButton,
            props: {
              name: 'textContent',
              value: commands.talkAgain,
            },
          },
          {
            element: this.privatePolicyLink,
            props: {
              name: 'textContent',
              value: common.privatePolicy,
            },
          },
        ],
        lng
      )
    )
  }

  createElements() {
    const lng = this.memory.getLanguage()

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
            cb: (e) => handleCharButtonsClick({ target: e.target }),
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: common.elements.button,
      textContent: commands.startTalking[lng],
      disabled: common.types.boolean.true,
      classes: [classNames.selectCharUI.startBtn],
      listeners: [
        {
          event: common.events.click,
          cb: () => this.handlestartButtonClick(),
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

    this.privatePolicy = this.createPrivatePolicy()
  }

  handleCharButtonsClick({ target }) {
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

  handlestartButtonClick() {
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
      removeFrom: this.lngButtonsList,
      classes: [classNames.selectCharUI.lngBtnActive],
    })
  }

  createPrivatePolicy() {
    const lng = this.memory.getLanguage()
    const privatePolicyLinkContainer = createElementFn({
      element: common.elements.div,
      classes: [classNames.privatePolicy.linkContainer],
    })

    this.privatePolicyLink = createElementFn({
      element: common.elements.a,
      textContent: common.privatePolicy[lng],
      href: src.privatePolicy.site,
      classes: [classNames.privatePolicy.link],
    })

    privatePolicyLinkContainer.appendChild(this.privatePolicyLink)
    return privatePolicyLinkContainer
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

  createLists() {
    this.allElementsList = [
      this.plLngBtn,
      this.engLngBtn,
      this.headline,
      ...this.charButtons,
      this.startButton,
      this.talkAgainButton,
      this.privatePolicy,
    ]
    this.mainElementsList = [
      ...this.charButtons,
      this.startButton,
      this.headline,
    ]
    this.lngButtonsList = [this.engLngBtn, this.plLngBtn]
  }

  toggleReadyStartCharTalkingBtn(toggle) {
    toggleReadyFn({
      toggle,
      elements: [this.startButton],
      classes: [classNames.selectCharUI.startBtnReady],
    })
  }

  changeUI(messages) {
    if (messages) {
      this.messagesComponent = this.createMessagesComponent(messages)
      this.containerSent.prepend(this.messagesComponent)
    }

    setPropsFn([
      {
        elements: this.mainElementsList,
        styleProps: [{ name: 'display', value: messages ? 'none' : 'block' }],
      },
      {
        elements: [this.talkAgainButton],
        styleProps: [{ name: 'display', value: messages ? 'block' : 'none' }],
      },
      {
        elements: this.lngButtonsList,
        styleProps: [{ name: 'display', value: messages ? 'none' : 'block' }],
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
