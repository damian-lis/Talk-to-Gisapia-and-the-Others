import Gisapia from '../characters/Gisapia.js'
import { scriptTalk, memory } from '../data/gisapia/index.js'
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
