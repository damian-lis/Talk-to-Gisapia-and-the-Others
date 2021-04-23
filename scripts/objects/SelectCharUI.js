import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js'
import {
  classNames,
  chooseCharacter,
  startTalking,
  talkAgain,
  privatePolicy,
  src,
} from '/data/global/names.js'

class SelectCharUI {
  constructor(charNames, container, memory) {
    this.containerSent = document.querySelector(container)
    this.memory = memory
    const selectCharUIElements = this.createSelectCharUIElements(charNames)
    this.subscribers = {}
    appendElementsToContainerFn(selectCharUIElements, this.containerSent)
  }

  createSelectCharUIElements(charNames) {
    this.headline = createElementFn({
      element: 'h1',
      textContent: chooseCharacter[this.memory.getLanguage()],
      classes: [classNames.selectCharUI.headline],
    })

    this.charButtons = Object.entries(charNames).map((charName) =>
      createElementFn({
        element: 'button',
        textContent: charName[1],
        classes: [classNames.selectCharUI.selectBtn],
        listeners: [
          {
            event: 'click',
            cb: (e) => {
              this.subscribers['selectChar'](charName[1])
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
      element: 'button',
      textContent: startTalking[this.memory.getLanguage()],
      disabled: 'true',
      classes: [classNames.selectCharUI.startBtn],
      listeners: [
        {
          event: 'click',
          cb: () => {
            this.memory.playFallDownAudio()
            this.memory.playBackgroundAudio()
            this.memory.playClickAudio()
            this.subscribers['startTalking']()
          },
        },
      ],
    })

    this.talkAgainButton = createElementFn({
      element: 'button',
      textContent: talkAgain[this.memory.getLanguage()],
      classes: [
        classNames.selectCharUI.startBtn,
        classNames.selectCharUI.startBtnReady,
      ],
      styles: [{ name: 'display', value: 'none' }],
      listeners: [
        {
          event: 'click',
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
            this.toggleStartCharTalkingBtn('off')
            this.toggleLanguageBtns('on')
          },
        },
      ],
    })

    this.plLngBtn = createElementFn({
      element: 'button',
      textContent: 'PL',
      classes:
        this.memory.getLanguage() === 'pl'
          ? [
              classNames.selectCharUI.plLngBtn,
              classNames.selectCharUI.lngBtnActive,
            ]
          : [classNames.selectCharUI.plLngBtn],

      listeners: [
        {
          event: 'click',
          cb: (e) => {
            this.memory.changeLanguage()
            this.changeSelectCharUITexts()
            this.memory.playClickAudio()
            this.removeActives(
              [this.plLngBtn, this.engLngBtn],
              classNames.selectCharUI.lngBtnActive
            )
            this.setActive(e.target, classNames.selectCharUI.lngBtnActive)
          },
        },
      ],
    })
    this.engLngBtn = createElementFn({
      element: 'button',
      textContent: 'ENG',
      classes:
        this.memory.getLanguage() === 'eng'
          ? [
              classNames.selectCharUI.engLngBtn,
              classNames.selectCharUI.lngBtnActive,
            ]
          : [classNames.selectCharUI.engLngBtn],

      listeners: [
        {
          event: 'click',
          cb: (e) => {
            this.memory.changeLanguage()
            this.changeSelectCharUITexts()
            this.memory.playClickAudio()
            this.removeActives(
              [this.plLngBtn, this.engLngBtn],
              classNames.selectCharUI.lngBtnActive
            )
            this.setActive(e.target, classNames.selectCharUI.lngBtnActive)
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

  changeSelectCharUITexts() {
    this.headline.textContent = chooseCharacter[this.memory.getLanguage()]
    this.startButton.textContent = startTalking[this.memory.getLanguage()]
    this.talkAgainButton.textContent = talkAgain[this.memory.getLanguage()]
    this.privatePolicyLink.textContent =
      privatePolicy[this.memory.getLanguage()]
  }

  createPrivatePolicy() {
    this.privatePolicyLinkContainer = createElementFn({
      element: 'div',
      classes: [classNames.privatePolicy.linkContainer],
    })

    this.privatePolicyLink = createElementFn({
      element: 'a',
      textContent: privatePolicy[this.memory.getLanguage()],
      href: src.privatePolicy.site,
      classes: [classNames.privatePolicy.link],
    })

    this.privatePolicyLinkContainer.appendChild(this.privatePolicyLink)
    return this.privatePolicyLinkContainer
  }

  toggleStartCharTalkingBtn(toggle) {
    if (toggle === 'on') {
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
    const msgsInCorrectLng = messages[this.memory.getLanguage()]
    const msgContainer = createElementFn({
      element: 'div',
    })

    msgsInCorrectLng.map((message) => {
      const msg = createElementFn({
        element: 'p',
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
    this.toggleLanguageBtns('off')
  }

  toggleLanguageBtns(toggle) {
    ;[this.plLngBtn, this.engLngBtn].map((icon) => {
      icon.style.display = toggle === 'on' ? 'block' : 'none'
    })
  }

  changeDisplay({ initialSettings } = false) {
    ;[...this.charButtons, this.startButton, this.headline].map((element) => {
      element.style.display = initialSettings ? 'block' : 'none'
    })
    this.talkAgainButton.style.display = initialSettings ? 'none' : 'block'
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
