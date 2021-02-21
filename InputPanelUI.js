export default class InputPanelUI {
  constructor(container) {
    const root = this.createRoot()
    this.input = this.createInput()
    this.button = this.createButton()
    this.appendToRoot(root, this.input, this.button)
    this.attachToContainer(container, root)
    this.inputMessage = ''
    this.subscribers = []
  }

  createRoot() {
    const root = document.createElement('div')
    return root
  }

  createInput() {
    const input = document.createElement('input')
    input.addEventListener('change', (e) => {
      this.inputMessage = e.target.value
    })

    return input
  }

  createButton(root) {
    const button = document.createElement('button')
    button.textContent = 'Porozmawiaj'
    button.addEventListener('click', () => {
      this.subscribers.forEach((s) => s(this.inputMessage))
    })

    return button
  }

  appendToRoot(root, ...elements) {
    elements.map((element) => root.appendChild(element))
  }

  attachToContainer(container, root) {
    document.querySelector(container).appendChild(root)
  }

  deactivatePanel() {}

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
