import { Character } from '/scripts/objects/index.js'
import { common, src } from '/data/names.js'

class Gisapia extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory)
    this.name = common.charNames.Gisapia
    this.avatar = src.characters.gisapia.avatar
  }
}

export default Gisapia
