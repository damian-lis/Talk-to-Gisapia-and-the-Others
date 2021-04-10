import Character from './Character.js'
import { charNames, src } from '/data/global/names.js'

class Hookin extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = charNames.Hookin
    this.avatar = src.characters.hookin.avatar
  }
}

export default Hookin
