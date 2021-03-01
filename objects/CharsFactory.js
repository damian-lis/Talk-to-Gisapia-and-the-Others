import { Gisapia, NullCharacter, Ted } from '../objects/index.js'
import { scriptTalk, memory } from '../data/gisapia/index.js'
import {
  scriptTalk as tedScriptTalk,
  memory as tedMemory,
} from '../data/ted/index.js'
import { charNames } from '../data/globalNames.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(scriptTalk, memory)
    this.ted = new Ted(tedScriptTalk, tedMemory)
    this.nullCharacter = new NullCharacter()
  }

  getChar(charName) {
    switch (charName) {
      case charNames.gisapia:
        return this.gisapia
      case charNames.ted:
        return this.ted
      default:
        return this.nullCharacter
    }
  }
}
