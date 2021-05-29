import { common, ideReferences } from '/data/names.js'

class GisapiaAnimation {
  constructor() {
    this.gisapiaObject = this.getObjectContent()
    this.lips = this.gisapiaObject.querySelector(ideReferences.gisapia.lips)
    this.rightHand = this.gisapiaObject.querySelector(
      ideReferences.gisapia.rightHand
    )
    this.hair = this.gisapiaObject.querySelector(ideReferences.gisapia.hair)
    this.eyes = this.gisapiaObject.querySelector(ideReferences.gisapia.eyes)

    this.animation = this.startAnimation()
  }

  getObjectContent() {
    return document.querySelector(ideReferences.gisapia.main).contentDocument
  }

  startAnimation() {
    this.master = new TimelineMax()
    this.master
      .add(common.startAnimation)
      .add(this.lipsAnimation(), common.startAnimation)
      .add(this.rightHandAnimation(), common.startAnimation)
      .add(this.hairAnimation(), common.startAnimation)
      .add(this.eyesAnimation(), common.startAnimation)
  }

  lipsAnimation = () => {
    const tl = new TimelineMax({
      onComplete: this.lipsAnimation,
    })
    tl.to(this.lips, 0.1, {
      scale: this.setScale(0.2, 1),
      yoyo: true,
      transformOrigin: '50% 50%',
    })
    return tl
  }

  rightHandAnimation = () => {
    const tl = new TimelineMax()
    tl.set(this.rightHand, {
      rotation: -10,
      transformOrigin: '5% 100%',
    }).to(this.rightHand, 0.5, {
      rotation: 10,
      transformOrigin: '5% 100%',
      yoyo: true,
      repeat: -1,
      ease: Power0.easeIn,
    })
    return tl
  }

  hairAnimation = () => {
    const tl = new TimelineMax({
      onComplete: this.hairAnimation,
    })
    tl.to(this.hair, 1, {
      scale: this.setScale(0.03, 0.97),
      transformOrigin: '50% 50%',
    })
    return tl
  }

  eyesAnimation = () => {
    const tl = new TimelineMax({
      onComplete: this.eyesAnimation,
    })
    tl.to(this.eyes, 1, {
      scale: this.setScale(0.05, 1),
      transformOrigin: '50% 50%',
    })
    return tl
  }

  setScale(...values) {
    return Math.random() * values[0] + values[1]
  }
}

export default GisapiaAnimation
