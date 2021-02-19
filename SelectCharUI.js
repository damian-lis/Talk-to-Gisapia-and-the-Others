export class SelectCharUI {
  constructor(container) {
    const root = this.createRoot()
    this.createCharacters(root)
    this.attachToContainer(container, root)
    this.subscribers = []
  }

  createRoot() {
    const root = document.createElement('div')
    return root
  }

  createCharacters(root) {
    root.appendChild(this.createCharacter('Gisapia', 'gisapia'))
    root.appendChild(this.createCharacter('Ted', 'ted'))
    root.appendChild(this.createCharacter('Jessica', 'jessica'))
  }

  attachToContainer(container, root) {
    document.querySelector(container).appendChild(root)
  }

  removeActive() {
    document.querySelectorAll('button').forEach((button) => {
      button.classList.remove('active')
    })
  }

  addActive(btn) {
    btn.classList.add('active')
  }

  createCharacter(name, selector) {
    const character = document.createElement('div')
    character.textContent = name
    character.addEventListener('click', () => {
      this.subscribers.forEach((s) => s(selector))
      this.removeActive()
      this.addActive(character)
    })
    return character
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
