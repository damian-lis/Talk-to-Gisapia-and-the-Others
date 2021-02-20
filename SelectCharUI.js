export default class SelectCharUI {
  constructor(container) {
    const root = this.createRoot()
    this.createButtons(root)
    this.attachToContainer(container, root)
    this.subscribers = []
  }

  createRoot() {
    const root = document.createElement('div')
    return root
  }

  createButtons(root) {
    root.appendChild(this.createButton('Gisapia'))
    root.appendChild(this.createButton('Ted'))
    root.appendChild(this.createButton('Jessica'))
  }

  attachToContainer(container, root) {
    document.querySelector(container).appendChild(root)
  }

  // removeActive() {
  //   document.querySelectorAll('button').forEach((button) => {
  //     button.classList.remove('active')
  //   })
  // }

  // addActive(btn) {
  //   btn.classList.add('active')
  // }

  createButton(name) {
    const button = document.createElement('button')
    button.textContent = name
    button.addEventListener('click', () => {
      this.subscribers.forEach((s) => s(name))
      // this.removeActive()
      // this.addActive(button)
    })
    return button
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
