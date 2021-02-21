export default class InputPanelUI {
  constructor(container) {
    // const root = this.createRoot()
    this.input = this.createInput()
    this.button = this.createButton()
    // this.appendToRoot(root, this.input, this.button)
    this.attachToContainer(container, this.input, this.button)
    this.inputMessage = ''
    this.subscribers = []
  }

  createRoot() {
    const root = document.createElement('div')
    return root
  }

  createInput() {
    const input = document.createElement('input')
    input.disabled = true
    input.addEventListener('change', (e) => {
      this.inputMessage = e.target.value
    })

    return input
  }

  createButton() {
    const button = document.createElement('button')
    button.textContent = 'Wyślij'
    button.disabled = true
    button.addEventListener('click', () => {
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
    // document.querySelector(container).appendChild(root)
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
