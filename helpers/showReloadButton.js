import { communiques } from '../data/globalNames.js'

export default (callback) => {
  const button = document.createElement('button')
  button.innerText = communiques.talkAgain
  button.addEventListener('click', () => callback())
  document.body.appendChild(button)
}
