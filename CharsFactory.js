import Gisapia from './characters/Gisapia.js'
import questions from './seeds/messages/gisapia.js'

export default class CharsFactory {
  constructor() {
    this.gisapia = new Gisapia(questions)
  }

  getChar(charName) {
    switch (charName) {
      case 'Gisapia':
        return this.gisapia
    }
  }
}
