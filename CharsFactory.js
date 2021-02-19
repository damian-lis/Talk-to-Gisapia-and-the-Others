import Gisapia from './characters/Gisapia.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia()
  }

  getChar(charName) {
    switch (charName) {
      case 'Gisapia':
        return this.gisapia
    }
  }
}
