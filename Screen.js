export default class Screen {
  constructor(container) {
    this.screen = this.createScreen()
    this.attachToContainer(container, this.screen)
  }

  createScreen() {
    const screen = document.createElement('div')
    screen.classList.add('screen')
    return screen
  }

  attachMessageContainer(messageContainer) {
    this.screen.appendChild(messageContainer)
  }

  attachToContainer(container, screen) {
    document.querySelector(container).appendChild(screen)
  }
}
