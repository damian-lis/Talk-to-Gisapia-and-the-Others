import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import { classNames, commands, common, src } from '/data/main.js'

class SelectCharUI {
  constructor(charNames, container, memory) {
    this.containerSent = document.querySelector(container)
    this.memory = memory
    this.memory.lngSubscribe((lng) => this.changeLanguage(lng))
    const selectCharUIElements = this.createSelectCharUIElements(charNames)
    this.subscribers = {}

    appendElementsToContainerFn(selectCharUIElements, this.containerSent)
  }

  createSelectCharUIElements(charNames) {
    const lng = this.memory.getLanguage()

    this.headline = createElementFn({
      element: common.elements.h1,
      textContent: commands.chooseCharacter[lng],
      classes: [classNames.selectCharUI.headline],
    })

    this.charButtons = Object.entries(charNames).map((charName) =>
      createElementFn({
        element: common.elements.button,
        textContent: charName[1],
        classes: [classNames.selectCharUI.selectBtn],
        listeners: [
          {
            event: common.events.click,
            cb: (e) => {
              this.subscribers[common.selectChar](charName[1])
              this.removeActives(
                this.charButtons,
                classNames.selectCharUI.selectBtnActive
              )
              this.setActive(e.target, classNames.selectCharUI.selectBtnActive)
              this.memory.playClickAudio()
            },
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
          cb: () => {
            this.memory.playFallDownAudio()
            this.memory.playBackgroundAudio()
            this.memory.playClickAudio()
            this.subscribers[common.startTalking]()
          },
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
          cb: () => {
            this.memory.restart()
            this.memory.playFinishAudio({ pause: true, reload: true })
            this.memory.playBackgroundAudio({ reload: true })
            this.memory.playClickAudio()
            this.messagesComponent.remove()
            this.changeDisplay({ initialSettings: true })
            this.removeActives(
              this.charButtons,
              classNames.selectCharUI.selectBtnActive
            )
            this.toggleReadyStartCharTalkingBtn(common.toggle.off)
            this.toggleShowLanguageBtns(common.toggle.on)
          },
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
          cb: (e) => {
            this.memory.setLanguage(common.language.pl.small)
            this.memory.changeLanguage()
            this.memory.playClickAudio()
            this.removeActives(
              [this.plLngBtn, this.engLngBtn],
              classNames.selectCharUI.lngBtnActive
            )
            this.setActive(e.target, classNames.selectCharUI.lngBtnActive)
            this.removeDisableds([this.engLngBtn, this.plLngBtn])
            this.setDisabled(e.target)
          },
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
          cb: (e) => {
            this.memory.setLanguage(common.language.eng.small)
            this.memory.changeLanguage()
            this.memory.playClickAudio()
            this.removeActives(
              [this.plLngBtn, this.engLngBtn],
              classNames.selectCharUI.lngBtnActive
            )
            this.setActive(e.target, classNames.selectCharUI.lngBtnActive)
            this.removeDisableds([this.engLngBtn, this.plLngBtn])
            this.setDisabled(e.target)
          },
        },
      ],
    })

    this.privatePolicy = this.createPrivatePolicy()

    return [
      this.plLngBtn,
      this.engLngBtn,
      this.headline,
      ...this.charButtons,
      this.startButton,
      this.talkAgainButton,
      this.privatePolicy,
    ]
  }

  getCharButtons() {
    return this.charButtons
  }

  changeLanguage(lng) {
    this.headline.textContent = commands.chooseCharacter[lng]
    this.startButton.textContent = commands.startTalking[lng]
    this.talkAgainButton.textContent = commands.talkAgain[lng]
    this.privatePolicyLink.textContent = common.privatePolicy[lng]
  }

  createPrivatePolicy() {
    const lng = this.memory.getLanguage()
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

    this.privatePolicyLinkContainer.appendChild(this.privatePolicyLink)
    return this.privatePolicyLinkContainer
  }

  toggleReadyStartCharTalkingBtn(toggle) {
    if (toggle === common.toggle.on) {
      this.startButton.disabled = false
      this.startButton.classList.add(classNames.selectCharUI.startBtnReady)
    } else {
      this.startButton.disabled = true
      this.startButton.classList.remove(classNames.selectCharUI.startBtnReady)
    }
  }

  handleFinishAudio() {
    this.memory.playFallDownAudio()
    this.memory.playFinishAudio()
    this.memory.playBackgroundAudio({ pause: true })
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

  showFinishMessages(messages) {
    this.messagesComponent = this.createMessagesComponent(messages)
    this.containerSent.prepend(this.messagesComponent)
    this.changeDisplay()
    this.handleFinishAudio()
    this.toggleShowLanguageBtns(common.toggle.off)
  }

  toggleShowLanguageBtns(toggle) {
    ;[this.plLngBtn, this.engLngBtn].map((icon) => {
      icon.style.display =
        toggle === common.toggle.on
          ? common.styleProps.values.block
          : common.styleProps.values.none
    })
  }

  setDisabled(element) {
    element.disabled = true
  }

  removeDisableds(elements) {
    elements.map((element) => {
      element.disabled = false
    })
  }

  changeDisplay({ initialSettings } = false) {
    ;[...this.charButtons, this.startButton, this.headline].map((element) => {
      element.style.display = initialSettings
        ? common.styleProps.values.block
        : common.styleProps.values.none
    })
    this.talkAgainButton.style.display = initialSettings
      ? common.styleProps.values.none
      : common.styleProps.values.block
  }

  removeActives(elements, clsName) {
    elements.map((btn) => btn.classList.remove(clsName))
  }

  getCharButtons() {
    return this.charButtons
  }

  setActive(element, clsName) {
    element.classList.add(clsName)
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}

export default SelectCharUI
