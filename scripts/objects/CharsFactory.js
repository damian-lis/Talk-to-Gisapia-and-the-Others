import { Gisapia, NullCharacter, Hookin, Reduxon } from './index.js'
import { scriptTalk, memory } from '../../data/gisapia/index.js'
import {
  scriptTalk as tedScriptTalk,
  memory as tedMemory,
} from '../../data/hookin/index.js'
import {
  scriptTalk as reduxonScriptTalk,
  memory as reduxonMemory,
} from '../../data/reduxon/index.js'
import { charNames } from '../../data/globalNames.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(scriptTalk, memory)
    this.hookin = new Hookin(tedScriptTalk, tedMemory)
    this.reduxon = new Reduxon(reduxonScriptTalk, reduxonMemory)
    this.nullCharacter = new NullCharacter()
  }

  getChar(charName) {
    switch (charName) {
      case charNames.gisapia:
        return this.gisapia
      case charNames.hookin:
        return this.hookin
      case charNames.reduxon:
        return this.reduxon
      default:
        return this.nullCharacter
    }
  }
}
