import Character from './Character.js'
import { charNames } from '../../../data/globalNames.js'

class Gisapia extends Character {
  constructor(scriptTalk, memory) {
    super(scriptTalk, memory)
    this.name = charNames.Gisapia
    this.avatar = '/images/gisapia/avatar.jpg'
  }
}

export default Gisapia