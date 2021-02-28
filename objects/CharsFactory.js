import Gisapia from '../objects/characters/Gisapia.js'
import NullCharacter from '../objects/characters/NullCharacter.js'
import { scriptTalk, memory } from '../data/gisapia/index.js'
import { charNames } from '../data/globalNames.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(scriptTalk, memory)
    this.nullCharacter = new NullCharacter()
  }

  getChar(charName) {
    switch (charName) {
      case charNames.gisapia:
        return this.gisapia
      default:
        return this.nullCharacter
    }
  }
}
