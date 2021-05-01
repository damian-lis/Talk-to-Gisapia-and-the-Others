import { common, chineseString } from '/data/main.js'

class Background {
  constructor() {
    this.canvas = document.getElementById(common.elements.canvas)
    this.cxt = canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.chinese = chineseString
    this.chinese = this.chinese.split('')
    this.font_size = 20
    this.columns = this.canvas.width / this.font_size
    this.drops = this.addDrops()
    this.draw()
    this.resize()
  }

  resize() {
    window.addEventListener(common.events.resize, () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.columns = this.canvas.width / this.font_size
      this.drops = this.addDrops()
    })
  }

  addDrops() {
    let drops = []
    for (let i = 0; i < this.columns; i++) {
      drops[i] = 1
    }
    return drops
  }

  draw(time = 33) {
    setInterval(() => {
      this.cxt.fillStyle = 'rgba(0,0,0,0.05)'
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.cxt.fillStyle = 'rgb(132, 42, 86)'
      this.cxt.font = this.font_size + 'px arial'

      for (let i = 0; i < this.drops.length; i++) {
        let text = this.chinese[Math.floor(Math.random() * this.chinese.length)]
        this.cxt.fillText(
          text,
          i * this.font_size,
          this.drops[i] * this.font_size
        )

        if (
          this.drops[i] * this.font_size > this.canvas.height &&
          Math.random() > 0.975
        )
          this.drops[i] = 0
        this.drops[i]++
      }
    }, time)
  }
}

export default Background
