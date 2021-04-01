import Character from './Character.js'
import { charNames } from '../../../data/globalNames.js'

class Hookin extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = charNames.Hookin
    this.avatar = '/images/hookin/avatar.jpg'
  }
}

export default Hookin
