import {
  createElementFn,
  appendElementsToContainerFn,
  setClassesFn,
  setPropsFn,
} from '/scripts/helpers/index.js'
import { common, elements, classNames, animationSettings } from '/data/names.js'

class Messenger {
  constructor({ container }) {
    this.createElements()
    this.createComponents()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container,
    })
  }

  createElements() {
    this.mainContainer = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.main],
    })

    this.mainContainerInner = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.inner],
    })
  }

  createComponents() {
    this.mainComponent = appendElementsToContainerFn({
      elements: [this.mainContainerInner],
      container: this.mainContainer,
    })
  }

  move({ type }) {
    setPropsFn({
      objs: [
        {
          elements: [this.mainContainer],
          styleProps: [
            {
              name: common.animation,
              value: type,
            },
          ],
        },
      ],
    })
  }

  changeColor({ char }) {
    setClassesFn({
      objs: [
        {
          elements: [this.mainContainer],
          initialClass: classNames.messenger.main,
          classes: [`${char.name.toLowerCase()}-${common.main}`],
        },
      ],
    })
  }

  getMainContainerInner() {
    return this.mainContainerInner
  }
}

export default Messenger
