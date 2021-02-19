import Gisapia from './Gisapia.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia()
  }

  getChar(character) {
    switch (character) {
      case 'Gisapia':
        return this.gisapia
    }
  }
}
