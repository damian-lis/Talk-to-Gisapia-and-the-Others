import Character from './Character.js'
import { charNames, src } from '/data/global/names.js'

class Gisapia extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = charNames.Gisapia
    this.avatar = src.characters.gisapia.avatar
  }
}

export default Gisapia
