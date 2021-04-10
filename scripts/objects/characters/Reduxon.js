import Character from './Character.js'
import { charNames } from '/data/global/names.js'

class Reduxon extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = charNames.Reduxon
    this.avatar = '/images/reduxon/avatar.jpg'
  }
}

export default Reduxon
