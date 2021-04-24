import Character from './Character.js'
import { charNames, src } from '/data/global/names.js'

class Hookin extends Character {
  constructor(scriptTalk, charMemory, memory) {
    super(scriptTalk, charMemory, memory)
    this.name = charNames.Hookin
    this.avatar = src.characters.hookin.avatar
  }
}

export default Hookin
