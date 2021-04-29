import { Character } from '/scripts/objects/index.js'
import { common, src } from '/data/main.js'

class Reduxon extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory)
    this.name = common.charNames.Reduxon
    this.avatar = src.characters.reduxon.avatar
  }
}

export default Reduxon
