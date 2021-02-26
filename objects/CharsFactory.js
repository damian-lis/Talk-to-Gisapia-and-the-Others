import Gisapia from '../characters/Gisapia.js'
import scriptTalk from '../data/gisapia/scriptTalk.js'
import memory from '../data/gisapia/memory.js'
import { charNames } from '../data/globalNames.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(scriptTalk, memory)
  }

  getChar(charName) {
    switch (charName) {
      case charNames.gisapia:
        return this.gisapia
    }
  }
}
