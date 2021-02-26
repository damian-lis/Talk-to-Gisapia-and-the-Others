import Character from './Character.js'
import Animation from '../animations/GisapiaAnimation.js'

export default class Gisapia extends Character {
  constructor(dataSets, memorySets) {
    super(dataSets, memorySets)
    this.name = 'Gisapia'
    this.avatar = '/images/gisapia/avatar.jpg'
  }
}
