export default (callback) => {
  const button = document.createElement('button')
  button.textContent = 'Porozmawiaj ponownie'
  button.addEventListener('click', () => callback())
  document.body.appendChild(button)
}
