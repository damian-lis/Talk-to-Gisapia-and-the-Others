export default class GisapiaAnimation {
  constructor() {
    this.gisapiaSVG = this.getSVG()
    this.animation = this.startAnimation()
  }

  getSVG() {
    return document.querySelector('#gisapiasvg').contentDocument
  }

  startAnimation() {
    this.master = new TimelineMax()
    this.master
      .add('startAnimation')
      .add(this.lipsAnimation(), 'startAnimation')
      .add(this.rightHandAnimation(), 'startAnimation')
      .add(this.hairAnimation(), 'startAnimation')
      .add(this.eyesAnimation(), 'startAnimation')
  }

  lipsAnimation = () => {
    const tl = new TimelineMax({
      onComplete: this.lipsAnimation,
    })
    const lips = this.gisapiaSVG.querySelector('#lips')
    const scale = () => {
      return Math.random() * 0.2 + 1
    }
    tl.to(lips, 0.1, {
      scale: scale,
      yoyo: true,
      transformOrigin: '50% 50%',
    })
    return tl
  }

  rightHandAnimation = () => {
    const tl = new TimelineMax()
    const rightHand = this.gisapiaSVG.querySelector('#right-hand')
    tl.set(rightHand, {
      rotation: -10,
      transformOrigin: '5% 100%',
    }).to(rightHand, 0.5, {
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
    const hair = this.gisapiaSVG.querySelector('#hair')
    const scale = () => {
      return Math.random() * 0.03 + 0.97
    }
    tl.to(hair, 1, {
      scale: scale,
      transformOrigin: '50% 50%',
    })
    return tl
  }

  eyesAnimation = () => {
    const tl = new TimelineMax({
      onComplete: this.eyesAnimation,
    })
    const eyes = this.gisapiaSVG.querySelector('#eyes')
    const scale = () => {
      return Math.random() * 0.05 + 1
    }
    tl.to(eyes, 1, {
      scale: scale,
      transformOrigin: '50% 50%',
    })
    return tl
  }
}
