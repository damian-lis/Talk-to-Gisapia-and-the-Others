import Character from './Character.js'

export default class Gisapia extends Character {
  constructor(questions) {
    super(questions)
    this.name = 'Gisapia'
    this.avatar = '/images/gisapia.jpg'
    // this.memory = {}
    // this.questions = questions ? questions : {}
  }

  // getQuestions(category) {
  //   return this.questions[category]
  // }

  // mustThink(time) {
  //   return new Promise((resolve) => setTimeout(resolve, time))
  // }
}
