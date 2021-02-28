import { buttons, subscriberTypes } from '../data/globalNames.js'
import { createElementFn } from '../helpers/index.js'

export default class SelectCharUI {
  constructor(charNames, container) {
    this.container = container
    this.headline = this.createHeadline()
    this.charButtons = this.createButtons(charNames, subscriberTypes.selectChar)
    this.startButton = this.createButton(
      buttons.names.letsTalk,
      subscriberTypes.charTalking
    )

    this.attachToContainer(
      this.container,
      this.headline,
      ...this.charButtons,
      this.startButton
    )
    this.subscribers = {}
  }

  deleteButtons(...buttons) {
    buttons.map((button) => button.remove())
  }

  showEndMessage() {
    this.deleteButtons(...this.charButtons, this.startButton)
    this.headline.innerText = 'Spawdź swojego maila!'
  }

  createHeadline() {
    const headline = createElementFn({
      elementToCreate: 'h1',
      text: 'Wybierz swojego rozmówcę!',
    })
    return headline
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

  removeActive(elements) {
    elements.map((element) => element.classList.remove('active'))
  }

  getCharButtons() {
    return this.charButtons
  }

  setActive(element) {
    this.removeActive(this.charButtons)
    element && element.classList.add('active')
  }

  createButton(name, type) {
    const button = createElementFn({
      elementToCreate: 'button',
      text: name,
      classesName: [`${type}`],
    })
    button.addEventListener('click', () => {
      this.subscribers[type](name)
      if (type !== subscriberTypes.charTalking) {
        this.setActive(button)
      }
    })
    return button
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}
