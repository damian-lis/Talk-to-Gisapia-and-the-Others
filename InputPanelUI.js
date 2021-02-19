export default class InputPanelUI {
  constructor(container) {
    const root = this.createRoot()
    this.createInput(root)
    this.createButton(root)
    this.attachToContainer(container, root)
    this.inputText = ''
    this.subscribers = []
  }

  createRoot() {
    const root = document.createElement('div')
    return root
  }

  createInput(root) {
    const input = document.createElement('input')

    input.addEventListener('change', (e) => {
      this.inputText = e.target.value
    })
    root.appendChild(input)
  }

  createButton(root) {
    const button = document.createElement('button')
    button.addEventListener('click', () => {
      this.subscribers.forEach((s) => s(this.inputText))
    })

    root.appendChild(button)
  }

  attachToContainer(container, root) {
    document.querySelector(container).appendChild(root)
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
