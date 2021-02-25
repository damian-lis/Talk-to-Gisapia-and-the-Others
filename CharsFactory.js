import Gisapia from './characters/Gisapia.js'
import dataSets from './data/gisapia/dataSets.js'
import memorySets from './data/gisapia/memorySets.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(dataSets, memorySets)
  }

  getChar(charName) {
    switch (charName) {
      case 'Gisapia':
        return this.gisapia
    }
  }
}
