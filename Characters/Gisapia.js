import Character from './Character.js'

export default class Gisapia extends Character {
  constructor(questions) {
    super(questions)
    this.name = 'Gisapia'
    this.avatar = '/images/gisapia.jpg'
    this.memory = {
      introduce: ['Damian', 'Kasia'],
      origin: ['Wałbrzych', 'Wrocław', 'Wrocławia', 'Wałbrzycha'],
    }
  }
}
