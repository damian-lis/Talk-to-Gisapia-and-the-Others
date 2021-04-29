import Character from './Character.js'
import { common, src } from '/data/main.js'

class Gisapia extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory)
    this.name = common.charNames.Gisapia
    this.avatar = src.characters.gisapia.avatar
  }
}

export default Gisapia
