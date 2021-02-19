export default class Screen {
  constructor(container) {
    this.screen = document.createElement('div')
    this.attachToContainer(container, screen)
  }

  attachMessageContainer(messageContainer) {
    this.screen.appendChild(messageContainer)
  }

  attachToContainer(container, screen) {
    document.querySelector(container).appendChild(screen)
  }
}
