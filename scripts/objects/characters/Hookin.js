import { Character } from '/scripts/objects/index.js'
import { common, src } from '/data/names.js'

class Hookin extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory)
    this.name = common.charNames.Hookin
    this.avatar = src.characters.hookin.avatar
  }
}

export default Hookin
