import { buttons, communiques } from './data/globalNames.js'

export default class InputPanelUI {
  constructor(container) {
    this.input = this.createInput()
    this.button = this.createButton()
    this.attachToContainer(container, this.input, this.button)
    this.inputMessage = ''
    this.subscribers = []
  }

  createInput() {
    const input = document.createElement('input')
    input.disabled = true

    const events = ['input', 'keypress']
    events.map((event) => {
      input.addEventListener(event, (e) => {
        if (event === 'input') {
          this.inputMessage = e.target.value
        } else {
          if (e.key === 'Enter') {
            if (this.inputMessage === '')
              return alert(communiques.mustToWriteSomething)
            this.subscribers.forEach((s) => s(this.inputMessage))
          }
        }
      })
    })

    return input
  }

  createButton() {
    const button = document.createElement('button')
    button.innerText = buttons.names.send
    button.disabled = true

    button.addEventListener('click', () => {
      if (this.inputMessage === '')
        return alert(communiques.mustToWriteSomething)
      this.subscribers.forEach((s) => s(this.inputMessage))
    })

    return button
  }

  appendToRoot(root, ...elements) {
    elements.map((element) => root.appendChild(element))
  }

  attachToContainer(container, ...elements) {
    elements.map((element) =>
      document.querySelector(container).appendChild(element)
    )
  }

  deactivatePanel() {
    this.input.disabled = true
    this.button.disabled = true
    this.clearInput()
  }

  activatePanel() {
    this.input.disabled = false
    this.button.disabled = false
  }

  clearInput() {
    this.input.value = ''
    this.inputMessage = ''
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
