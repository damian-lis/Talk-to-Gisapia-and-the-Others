import { Character } from '/scripts/objects/index.js';
import { charNames, src } from '/data/names.js';

class Gisapia extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory);
    this.name = charNames.Gisapia;
    this.avatar = src.characters.gisapia.avatar;
  }
}

export default Gisapia;
