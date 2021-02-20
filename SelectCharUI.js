export default class SelectCharUI {
  constructor({ container, charNames }) {
    this.charButtons = this.createButtons(charNames, 'selectChar')
    this.startButton = this.createButton('Porozmawiaj!', 'charTalking')
    this.attachToContainer(container, ...this.charButtons, this.startButton)
    this.subscribers = {}
  }

  createButtons(charNames, type) {
    const buttons = []
    charNames.map((character) =>
      buttons.push(this.createButton(character, type))
    )
    return buttons
  }

  attachToContainer(container, ...elements) {
    console.log(elements)
    const parent = document.querySelector(container)
    elements.map((element) => parent.appendChild(element))
  }

  deleteButton(buttonName) {
    switch (buttonName) {
      case 'charButton':
        return this.charButtons.map((button) => button.remove())

      case 'startButton':
        return this.startButton.remove()
    }
  }

  createButton(name, type) {
    let button
    button = document.createElement('button')
    button.textContent = name
    button.addEventListener('click', () => {
      this.subscribers[type](name)
    })
    return button
  }

  subscribe(subscriber, name) {
    this.subscribers[name] = subscriber
    console.log(this.subscribers)
  }
}
