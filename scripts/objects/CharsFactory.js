import { Gisapia, NullCharacter, Hookin, Reduxon } from './index.js'
import {
  gisapiaScriptTalk,
  gisapiaMemory,
} from '/data/characters/gisapia/index.js'
import {
  hookinScriptTalk,
  hookinMemory,
} from '/data/characters/hookin/index.js'
import {
  reduxonScriptTalk,
  reduxonMemory,
} from '/data/characters/reduxon/index.js'
import { charNames } from '/data/global/names.js'

class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(gisapiaScriptTalk, gisapiaMemory)
    this.hookin = new Hookin(hookinScriptTalk, hookinMemory)
    this.reduxon = new Reduxon(reduxonScriptTalk, reduxonMemory)
    this.nullCharacter = new NullCharacter()
  }

  getChar(charName) {
    switch (charName) {
      case charNames.Gisapia:
        return this.gisapia
      case charNames.Hookin:
        return this.hookin
      case charNames.Reduxon:
        return this.reduxon
      default:
        return this.nullCharacter
    }
  }
}

export default CharsFactory
