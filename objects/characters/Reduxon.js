import Character from './Character.js'

export default class Reduxon extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = 'Reduxon'
    this.avatar = '/images/reduxon/avatar.jpg'
  }
}
