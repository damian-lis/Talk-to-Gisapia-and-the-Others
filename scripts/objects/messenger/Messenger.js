import {
  createElementFn,
  appendElementsToContainerFn,
  setClassesFn,
  setPropsFn,
} from '/scripts/helpers/index.js'
import { common, elements, classNames, animationSettings } from '/data/names.js'

class Messenger {
  constructor(container) {
    this.createElements()
    this.createComponents()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container: document.querySelector(container),
    })
  }

  createElements() {
    this.container = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.main],
    })

    this.containerInner = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.inner],
    })
  }

  createComponents() {
    this.mainComponent = appendElementsToContainerFn({
      elements: [this.containerInner],
      container: this.container,
    })
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
