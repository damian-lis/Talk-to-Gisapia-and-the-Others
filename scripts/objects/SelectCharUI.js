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
      textContent:
        this.memory.getLanguage() === 'pl'
          ? chooseCharacter.pl
          : chooseCharacter.eng,
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
              this.removeActiveBtns()
              this.setActiveBtn(e.target)
              this.memory.playClickAudio()
            },
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: 'button',
      textContent:
        this.memory.getLanguage() === 'pl' ? startTalking.pl : startTalking.eng,
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
      textContent:
        this.memory.getLanguage() === 'pl' ? talkAgain.pl : talkAgain.eng,
      classes: [
        classNames.selectCharUI.startBtn,
        classNames.selectCharUI.readyBtn,
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
            this.removeActiveBtns()
            this.toggleStartCharTalkingBtn('off')
            this.toggleLanguageIcon('on')
          },
        },
      ],
    })

    this.languageIcon = createElementFn({
      element: 'img',
      classes: [classNames.selectCharUI.languageIcon],
      src: `/images/icons/${this.memory.getLanguage()}.svg`,
      listeners: [
        {
          event: 'click',
          cb: () => {
            this.memory.changeLanguage()
            this.changeLanguageImage()
            this.changeSelectCharUITexts()
          },
        },
      ],
    })

    this.privatePolicy = this.createPrivatePolicy()

    return [
      this.headline,
      ...this.charButtons,
      this.startButton,
      this.talkAgainButton,
      this.languageIcon,
      this.privatePolicy,
    ]
  }

  changeLanguageImage() {
    this.languageIcon.src = `/images/icons/${this.memory.getLanguage()}.svg`
  }

  changeSelectCharUITexts() {
    this.headline.textContent =
      this.memory.getLanguage() === 'pl'
        ? chooseCharacter.pl
        : chooseCharacter.eng
    this.startButton.textContent =
      this.memory.getLanguage() === 'pl' ? startTalking.pl : startTalking.eng
    ;(this.talkAgainButton.textContent =
      this.memory.getLanguage() === 'pl' ? talkAgain.pl : talkAgain.eng),
      (this.privatePolicyLink.textContent =
        this.memory.getLanguage() === 'pl'
          ? privatePolicy.pl
          : privatePolicy.eng)
  }

  createPrivatePolicy() {
    this.privatePolicyLinkContainer = createElementFn({
      element: 'div',
      classes: [classNames.privatePolicy.linkContainer],
    })

    this.privatePolicyLink = createElementFn({
      element: 'a',
      textContent:
        this.memory.getLanguage() === 'pl'
          ? privatePolicy.pl
          : privatePolicy.eng,
      href: src.privatePolicy.site,
      classes: [classNames.privatePolicy.link],
    })

    this.privatePolicyLinkContainer.appendChild(this.privatePolicyLink)
    return this.privatePolicyLinkContainer
  }

  toggleStartCharTalkingBtn(toggle) {
    if (toggle === 'on') {
      this.startButton.disabled = false
      this.startButton.classList.add(classNames.selectCharUI.readyBtn)
    } else {
      this.startButton.disabled = true
      this.startButton.classList.remove(classNames.selectCharUI.readyBtn)
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
    this.toggleLanguageIcon('off')
  }

  toggleLanguageIcon(toggle) {
    this.languageIcon.style.display = toggle === 'on' ? 'block' : 'none'
  }

  changeDisplay({ initialSettings } = false) {
    ;[...this.charButtons, this.startButton, this.headline].map((element) => {
      element.style.display = initialSettings ? 'block' : 'none'
    })
    this.talkAgainButton.style.display = initialSettings ? 'none' : 'block'
  }

  removeActiveBtns() {
    this.charButtons.map((btn) =>
      btn.classList.remove(classNames.selectCharUI.activeBtn)
    )
  }

  getCharButtons() {
    return this.charButtons
  }

  setActiveBtn(element) {
    element.classList.add(classNames.selectCharUI.activeBtn)
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}

export default SelectCharUI
