import Character from './Character.js'
import { charNames, src } from '/data/global/names.js'

class Reduxon extends Character {
  constructor(scriptTalk, charMemory, memory) {
    super(scriptTalk, charMemory, memory)
    this.name = charNames.Reduxon
    this.avatar = src.characters.reduxon.avatar
  }
}

export default Reduxon
