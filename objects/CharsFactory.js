import { Gisapia, NullCharacter, Ted, Reduxon } from '../objects/index.js'
import { scriptTalk, memory } from '../data/gisapia/index.js'
import {
  scriptTalk as tedScriptTalk,
  memory as tedMemory,
} from '../data/ted/index.js'
import {
  scriptTalk as reduxonScriptTalk,
  memory as reduxonMemory,
} from '../data/reduxon/index.js'
import { charNames } from '../data/globalNames.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(scriptTalk, memory)
    this.ted = new Ted(tedScriptTalk, tedMemory)
    this.reduxon = new Reduxon(reduxonScriptTalk, reduxonMemory)
    this.nullCharacter = new NullCharacter()
  }

  getChar(charName) {
    switch (charName) {
      case charNames.gisapia:
        return this.gisapia
      case charNames.ted:
        return this.ted
      case charNames.reduxon:
        return this.reduxon
      default:
        return this.nullCharacter
    }
  }
}
