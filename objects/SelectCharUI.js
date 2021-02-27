import { buttons, subscriberTypes } from '../data/globalNames.js'
import createElementFn from '../helpers/createElementFn.js'

export default class SelectCharUI {
  constructor(container, charNames) {
    this.charButtons = this.createButtons(charNames, subscriberTypes.selectChar)
    this.startButton = this.createButton(
      buttons.names.letsTalk,
      subscriberTypes.charTalking
    )
    this.attachToContainer(container, ...this.charButtons, this.startButton)
    this.subscribers = {}
  }

  createButtons(charNames, type) {
    const buttons = []
    Object.entries(charNames).map((charName) =>
      buttons.push(this.createButton(charName[1], type))
    )

    return buttons
  }

  attachToContainer(container, ...elements) {
    const parent = document.querySelector(container)
    elements.map((element) => parent.appendChild(element))
  }

  deleteButton(buttonType) {
    switch (buttonType) {
      case buttons.types.character:
        return this.charButtons.map((button) => button.remove())

      case buttons.types.start:
        return this.startButton.remove()
    }
  }

  createButton(name, type) {
    const button = createElementFn({ elementToCreate: 'button', text: name })
    button.addEventListener('click', () => {
      this.subscribers[type](name)
    })
    return button
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}
