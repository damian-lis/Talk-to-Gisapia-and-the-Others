import { Gisapia, Hookin, Reduxon } from './index.js';
import { charNames } from '/data/names.js';
import {
  gisapiaScriptTalk,
  gisapiaEmail,
  hookinScriptTalk,
  hookinEmail,
  reduxonScriptTalk,
  reduxonEmail,
} from '/data/characters/index.js';

class CharsFactory {
  constructor({ objects }) {
    this.gisapia = new Gisapia(gisapiaScriptTalk, gisapiaEmail, objects.memory);
    this.hookin = new Hookin(hookinScriptTalk, hookinEmail, objects.memory);
    this.reduxon = new Reduxon(reduxonScriptTalk, reduxonEmail, objects.memory);
  }

  getChar(charName) {
    switch (charName) {
      case charNames.Gisapia:
        return this.gisapia;
      case charNames.Hookin:
        return this.hookin;
      case charNames.Reduxon:
        return this.reduxon;
      default:
        break;
    }
  }
}

export default CharsFactory;
