export default class Screen {
  constructor(container) {
    this.screen = this.createScreen()
    this.attachToContainer(container)
  }

  createScreen() {
    const screen = document.createElement('div')
    screen.classList.add('screen')
    return screen
  }

  attachToScreen(element) {
    this.screen.appendChild(element)
  }

  attachToContainer(container) {
    document.querySelector(container).appendChild(this.screen)
  }

  createLoader() {
    const loader = document.createElement('div')
    loader.classList.add('loader')
    return loader
  }

  removeLoader(loader) {
    console.log('removeLoader')
    loader.remove()
  }

  showTyping(time) {
    const loader = this.createLoader()
    this.attachToScreen(loader)
    setTimeout(() => this.removeLoader(loader), time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
