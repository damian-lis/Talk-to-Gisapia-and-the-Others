import {
  createElementFn,
  appendElementsToContainerFn,
  setClassesFn,
  setPropsFn,
} from '/scripts/helpers/index.js'
import { common, classNames, animationSettings } from '/data/main.js'

class Messenger {
  constructor(container) {
    this.createElements()
    this.createComponents()

    appendElementsToContainerFn(
      [this.mainComponent],
      document.querySelector(container)
    )
  }

  createElements() {
    this.container = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.main],
    })

    this.containerInner = createElementFn({
      element: common.elements.div,
      classes: [classNames.messenger.inner],
    })
  }

  createComponents() {
    this.mainComponent = appendElementsToContainerFn(
      [this.containerInner],
      this.container
    )
  }

  move({ type }) {
    setPropsFn([
      {
        elements: [this.container],
        styleProps: [
          {
            name: common.animation,
            value:
              type === common.fallFromTop
                ? animationSettings.messenger.fallFromTop
                : animationSettings.messenger.BackToTheTop,
          },
        ],
      },
    ])
  }

  changeColor(chosenChar) {
    setClassesFn([
      {
        elements: [this.container],
        initialClass: classNames.messenger.main,
        classesToAdd: [`${chosenChar.name.toLowerCase()}-${common.main}`],
      },
    ])
  }

  getContainerInner() {
    return this.containerInner
  }
}

export default Messenger
