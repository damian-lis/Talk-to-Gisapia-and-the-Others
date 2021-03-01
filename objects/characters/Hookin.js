import Character from './Character.js'

export default class Ted extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = 'Hookin'
    this.avatar = '/images/hookin/avatar.jpg'
  }
}
