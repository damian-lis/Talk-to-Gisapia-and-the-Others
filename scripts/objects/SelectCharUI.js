import { createElementFn, appendElementsToContainer } from '../helpers/index.js'

class SelectCharUI {
  constructor(charNames, container) {
    const containerSent = document.querySelector(container)
    const selectCharUIElements = this.createSelectCharUIElements(charNames)
    this.subscribers = {}

    appendElementsToContainer(selectCharUIElements, containerSent)
  }

  createSelectCharUIElements(charNames) {
    this.headline = createElementFn({
      element: 'h1',
      textContent: 'Wybierz swojego rozmówcę!',
    })

    this.charButtons = Object.entries(charNames).map((charName) =>
      createElementFn({
        element: 'button',
        textContent: charName[1],
        classes: ['selectChar'],
        listeners: [
          {
            event: 'click',
            cb: (e) => {
              this.subscribers['selectChar'](charName[1])
              this.removeActive(this.charButtons)
              this.setActive(e.target)
            },
          },
        ],
      })
    )

    this.startButton = createElementFn({
      element: 'button',
      textContent: 'Porozmawiaj',
      classes: ['startTalking'],
      listeners: [
        {
          event: 'click',
          cb: () => {
            this.subscribers['startTalking']()
          },
        },
      ],
    })

    return [this.headline, ...this.charButtons, this.startButton]
  }

  deleteElements(...elements) {
    elements.map((element) => element.remove())
  }

  showEndMessage() {
    this.deleteElements(...this.charButtons, this.startButton)
    this.headline.innerText = 'Spawdź swojego maila!'
  }

  removeActive(elements) {
    elements.map((element) => element.classList.remove('active'))
  }

  getCharButtons() {
    return this.charButtons
  }

  setActive(element) {
    element.classList.add('active')
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
  }
}

export default SelectCharUI
