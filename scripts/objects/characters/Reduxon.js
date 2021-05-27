import { Character } from '/scripts/objects/index.js'
import { charNames, src } from '/data/names.js'

class Reduxon extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory)
    this.name = charNames.Reduxon
    this.avatar = src.characters.reduxon.avatar
  }
}

export default Reduxon
