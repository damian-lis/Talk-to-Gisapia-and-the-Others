# Talk-to-Gisapia-and-the-Others

The application allows You to write messages in two languages (PL/ENG) with 3 different characters who can collect information provided via the messenger by user, use them data during the conversation and send in an interesting form to the user e-mail.

<br/>

## Desktop version:

![](images/readme/introDesktop.gif)

<br/>

## Mobile version:

![](images/readme/introMobile.gif)

### Live version is available [here](https://talktogisapiaandtheothers.pl/).

<br/>
<br/>

## Table of Contents

1. Technologies
2. Setup
3. Solutions

<br/>

## 1. Technologies

The following technologies were used in the project:

- HTML
- CSS
- Javascript (OOP with design patterns)
- GSAP

<br/>

## 2. Setup

You don't need any commands to run this project

<br/>

## 3. Solutions

Most of the project is built in oop javascript for a very in-depth understanding of the language. The list of the most interesting solutions is presented below:

<br/>

### 3.1. General:

&nbsp; 3.1.1. String values in variables

&nbsp; 3.1.2. Helper functions

&nbsp; 3.1.3. The structure of styles

&nbsp; 3.1.4. The structure of js objects and their methods

&nbsp; 3.1.5. The structure of the app logic

<br/>

### 3.2. Specific:

&nbsp; 3.2.1. Matrix background

&nbsp; 3.2.2. GSAP for Gisapia animation

&nbsp; 3.2.3. Inheritance of traits by any character

&nbsp; 3.2.4. **FACTORY DESIGN PATTERN** when selecting a character

&nbsp; 3.2.5. **SINGLETON DESIGN PATTERN** while saving the settings

&nbsp; 3.2.6. **OBSERVER DESIGN PATTERN** during various events

&nbsp; 3.2.7. Character talk script and email templates

&nbsp; 3.2.8. The way of writing a message

&nbsp; 3.2.9. Adding words to character memory

&nbsp; 3.2.10. Sending user data to user by e-mail of selected character

&nbsp; 3.2.11. The ability to change characters during the conversation

&nbsp; 3.2.12. Opportunity to talk again with characters

<br/>

## 3.1. General

In this section, I would like to describe the general elements of the app that will allow a better understanding of the application architecture and logic that will be discussed in the sepcific section.

<br/>

### 3.1.1. String values in variables

In the project, almost all string values have been assigned to various variables to avoid unwanted errors by typos. Naming such values in the code is longer, but more secure and predictable.

<br/>

In the example below, we can see the different categories of variables:

```js
//data/names.js file:

export const common = {
  listeners: 'listeners',
  attributes: 'attributes',
  classes: 'classes',
  styles: 'styles',
  animation: 'animation',
  messages: 'messages',
  answers: 'answers',
  language: 'language',
  messagesPart: 'messagesPart',
  startAnimation: 'startAnimation',
  id: 'id',
  main: 'main',
  second: 'second',
  ball: 'ball',
  user: 'user',
  Enter: 'Enter',
}

export const subscriberNames = {
  selectChar: 'selectChar',
  startTalking: 'startTalking',
}

export const toggleValue = {
  on: 'on',
  off: 'off',
}

export const size = {
  large: 'large',
  small: 'small',
}

export const animations = {
  toBottomHide: 'toBottomHide:',
  fromBottomShow: 'fromBottomShow',
  fallFromTop: 'fallFromTop',
  backToTheTop: 'backToTheTop',
}

export const elements = {
  canvas: 'canvas',
  div: 'div',
  button: 'button',
  input: 'input',
  img: 'img',
  audio: 'audio',
  h1: 'h1',
  a: 'a',
  p: 'p',
}

export const elementProps = {
  names: {
    textContent: 'textContent',
    disabled: 'disabled',
  },
}

export const styleProps = {
  names: {
    display: 'display',
    pointerEvents: 'pointerEvents',
    visibility: 'visibility',
    opacity: 'opacity',
  },
  values: {
    none: 'none',
    block: 'block',
    visible: 'visible',
    hidden: 'hidden',
    auto: 'auto',
    flex: 'flex',
    visible: 'visible',
    hidden: 'hidden',
  },
}

  //more code here...
}
```

<br/>

### 3.1.2. Helper functions

All the so-called helper functions are in the helpers folder (scripts/helpers) which contains files with functions that are responsible for specific logic and are reusable throughout the project (they can also be used in other projects). They play the role of support functions that increase the readability of the code and the developer experience.

<br/>

Below is an example of the helpers folder structure:

![](images/readme/helpers.jpg)

<br/>

To better understand the logic of the app, which I will describe in the section named specific, I would like to briefly explain the logic of each of the helpers.

<br/>

Helpers list:

&nbsp; 1. appendElementsToContainerFn

&nbsp; 2. createElementFn

&nbsp; 3. removeElAmongElsFn

&nbsp; 4. setClassesFn

&nbsp; 5. setPropsFn

&nbsp; 6. setUpperLetterFn

<br/>

### 1. appendElementsToContainerFn

The first helper in the order is appendElementsToContainerFn which is responsible for attaching elements to the container.

<br/>

Its implementation is shown below:

```js
//scripts/helpers/appendElementsToContainerFn.js file:

import { types } from '/data/names.js'

export default ({ elements, container }) => {
  if (!container || !elements) return

  let containerEl = container

  if (typeof container === types.string) {
    containerEl = document.querySelector(container)
  }

  elements.map((element) => {
    let el = element

    if (typeof element === types.string) {
      el = document.querySelector(innerEl)
    }

    if (Array.isArray(el)) {
      const innerEls = el
      innerEls.map((innerElement) => {
        let innerEl = innerElement

        if (typeof innerElement === types.string) {
          innerEl = document.querySelector(innerElement)
        }
        containerEl.appendChild(innerEl)
      })
    } else containerEl.appendChild(el)
  })

  return containerEl
}
```

As we can see above, it is a function that destructs an object into:

- an array with elements (or elements references on the basis of which these elements are searched) to be attached to container,
- the container element (or container element reference on the basis of which the container element is searched) to which mentioned elements are to be attached.

<br/>

In the body of a function we have a logic in which:

- the passed values are checked (without them, the function will not execute its logic),
- when references have been passed to the function, appropriate elements are searched for in the DOM structure on their basis,
- the elements are attached to the container element based on the map method.

<br/>

To understand how to use this helper in practice, below is an example of its use in createComponents method of SelectCharUI object:

```js
//scripts/objects/SelectCharUI.js file:

this.mainComponent = appendElementsToContainerFn({
  elements: [
    ...this.lngButtons,
    this.headline,
    ...this.charButtons,
    this.startButton,
    this.talkAgainButton,
    this.privacyPolicyComponent,
  ],
  container: this.mainContainer,
})
```

As we can see in the above example, we pass to the helper function an object with elements (this.lngButtons, this.headline, this.charButtons, this.startButton, this.talkAgainButton, this.privacyPolicyComponent) to be attached to container and a container (this.mainContainer) to which we want to attach these elements.

<br/>

### 1.2. createElementFn

Next helper that I would like to briefly describe is createElementFn, which is used most often within the logic of the app and is used to create any html element with various properties.

<br/>

Its implementation is shown below:

```js
//scripts/helpers/createElementFn.js file:

import { common } from '/data/names.js'

export default ({ element, ...rest }) => {
  if (!element) return

  const createdElement = document.createElement(element)

  if (Object.keys(rest).length) {
    for (const propEl in rest) {
      switch (propEl) {
        case common.listeners:
          rest[propEl].map((listener) => {
            const { event, cb } = listener
            createdElement.addEventListener(event, (e) => cb(e))
          })
          break

        case common.attributes:
          rest[propEl].map((attribute) =>
            createdElement.setAttribute(
              `${attribute.name}`,
              `${attribute.value}`
            )
          )
          break

        case common.classes:
          createdElement.classList.add(...rest[propEl])
          break

        case common.styles:
          rest[propEl].map(
            (styleObj) => (createdElement.style[styleObj.name] = styleObj.value)
          )
          break

        default:
          if (
            createdElement.tagName === common.TEXTAREA &&
            propEl === common.type
          )
            break
          createdElement[propEl] = rest[propEl]
      }
    }
  }
  return createdElement
}
```

As we can see in the above example, the function destructs the passed object into:

- an element name (on this basis the element will be created),
- the properties, which will be added to the created element (rest properties of passed object)

<br/>

In the body of a function we have a logic in which:

- the passed element reference is checked (if not sent, the function is returned) and then created element on their basis,
- a switch statement is used so that we can easily assign the passed properties to the created element in an appropriate way,
- at the end, the created element with its properties is returned.

<br/>

To understand how to use this helper in practice, below is an example of its use in createElements method of SelectCharUI object:

```js
//scripts/objects/SelectCharUI.js file:

this.talkAgainButton = createElementFn({
  element: elements.button,
  textContent: commands.talkAgain[lng],
  classes: [
    classNames.selectCharUI.startBtn,
    classNames.selectCharUI.startBtnReady,
  ],
  styles: [
    {
      name: styleProps.names.display,
      value: styleProps.values.none,
    },
  ],
  listeners: [
    {
      event: events.click,
      cb: () => this.handleTalkAgainButtonClick(),
    },
  ],
})
```

As we can see in the above example, we pass to this helper an object with:

- the name of button element (element to create),
- textContent property which contains talk again message/command (which will be set on created element),
- appropriate class refeferences (class reference name which will be set on created element),
- style properties (name and value which will be set on created element),
- listeners (event and cb which will be set on created element).

<br/>

### 1.3. removeElAmongElsFn

The next helper in the sequence is called removeElAmongElsFn for remove the selected element from among other specified elements.

<br/>

Its implementation is shown below:

```js
//scripts/helpers/removeElAmongElsFn.js file:

import { types } from '/data/names.js'

export default ({ elementToRemove, removeFromElements }) => {
  if (!elementToRemove || !removeFromElements) return

  let elToRemove = elementToRemove
  let removeFromEls = removeFromElements

  if (typeof elementToRemove === types.string) {
    elToRemove = document.querySelector(elementToRemove)
  }

  if (typeof removeFromElements === types.string) {
    removeFromEls = document.querySelectorAll(removeFromElements)
  }

  removeFromEls[removeFromEls.length - 1] &&
    removeFromEls[removeFromEls.length - 1]
      .querySelector(elementToRemove)
      .remove()
}
```

As we can see in the above example, the function destructs the passed object into:

- the element to remove (or element reference on the basis of which the element to remove will be searched),
- set of elements (or elements reference on the basis of which the elements will be searched) from which the mentioned element is to be removed

<br/>

In the body of a function we have a logic in which:

- the passed values are checked (without them, the function will not execute its logic),
- a DOM elements are searched if the passed elements are a reference,
- at the very end, a specific element is searched among others and removed (when there are at least two elements in set).

<br/>

To understand how to use this helper in practice, below is an example of its use in createElements method of MessengerScreen object:

```js
//scripts/objects/MessengerScreen.js file:

removeElAmongElsFn({
  elementToRemove: elements.img,
  removeFromElements: `[${common.messagesPart}="${this.charMessagesPart}"]`,
})
```

As we can see in the above example, we pass to this helper an object with:

- element to remove (in this case img element),
- elements from which the above-mentioned element will be removed (in this case, these elements will be searched in the helper function by the attribute name and value).

<br/>

### 1.4. setClassesFn

The next helper in the order is setClassesFn which is responsible for setting different classes for different elements.

Its implementation is shown below:

```js
//scripts/helpers/setClassesFn.js file:

import { types, toggleValue } from '/data/names.js'

export default ({ toggle, objs, delay }) => {
  if (!objs) return

  const helperLogic = () => {
    objs.map((obj) => {
      if (!obj.classes) return

      if (obj.elements) {
        obj.elements.map((element) => {
          let el = element

          if (typeof element === types.string) {
            el = document.querySelector(element)
          }

          obj.classes.map((classEl) => {
            if (obj.removeFromElements) {
              obj.removeFromElements.map((removeFromElement) => {
                let removeFromEl = removeFromElement

                if (typeof removeFromElement === types.string) {
                  removeFromEl = document.querySelector(element)
                }

                removeFromEl.classList.remove(classEl)
                removeFromEl.disabled = false
              })
            }

            if (obj.initialClass) {
              el.className = obj.initialClass
            }

            if (toggle) {
              switch (toggle) {
                case toggleValue.on:
                  el.classList.add(classEl)
                  el.disabled = false
                  break
                case toggleValue.off:
                  el.classList.remove(classEl)
                  el.disabled = true
                  break

                default:
                  break
              }
            } else {
              el.classList.add(classEl)
            }
          })
        })
      } else {
        obj.classes.map((classEl) => {
          if (obj.removeFromElements) {
            obj.removeFromElements.map((removeFromElement) => {
              let removeFromEl = removeFromElement

              if (typeof removeFromElement === types.string) {
                removeFromEl = document.querySelector(element)
              }

              removeFromEl.classList.remove(classEl)
              removeFromEl.disabled = false
            })
          }
        })
      }
    })
  }

  if (delay) return setTimeout(helperLogic, delay)
  helperLogic()
}
```

As we can see in the above example, the function destructs the passed object into:

- toggle which takes the "on" or "off" values thanks to which we can easily set or delete passed classes on passed elements,
- objs which containing an array with objects with elements (or elements references on the basis of which the elements will be found and on which we set or remove classes), classes (to set or remove on elements), removeFromElements (or elements references on the basis of which the elements will be found and on which we remove classes) and initialClass (default passed element class),
- delay with time number so we can delay setting or deleting passed classes.

<br/>

In the body of a function we have a logic in which:

- the passed objs is checked ((if not sent, the function is returned)),
- a DOM elements are searched if the passed elements are a reference,
- the helperLogic function is created, in which, classes on the elements are added or removed depending on the arguments passed to helper,
- at the very end, when the delay value has been passed to the function, the setTimeout function is called with created helperLogic function and returned in the helper (because of the setTimeout specific id that it returns), if delay value is not passed, the helperLogic function itself is called.

<br/>

To understand how to use this helper in practice, below is an example of its use in changeColor method of SelectCharUI object:

```js
//scripts/objects/SelectCharUI.js file:

setClassesFn({
  toggle,
  objs: [
    {
      elements: [this.startButton],
      classes: [classNames.selectCharUI.startBtnReady],
    },
  ],
})
```

As we can see in the above example, to the helper an object is passed with:

- a toggle value ("on"/"off") (thanks to this, we decide whether we want to add classes to elements or not),
- objs as array of objects with elements (in this case only this.startButton element) and a classes (in this case class that gives the orange color suggesting activating to the passed button to start the conversation with choosen character).

Before going further, I would like to add that the toggle parameter does not need to be passed to the helper (without it, by the default classes will only be set to elements).

<br/>

### 1.5. setPropsFn

The penultimate helper in the sequence is called setPropsFn, whose logic is very similar to the previous setClassesFn helper and differs only in that instead of setting or removing classes on the passed elements, it sets various properties (also style properties).

<br/>

Its implementation is shown below:

```js
//scripts/helpers/setPropsFn.js file:

import { types, toggleValue } from '/data/names.js'

export default ({ toggle, objs, delay }) => {
  if (!objs) return

  const helperLogic = () => {
    objs.map((obj) => {
      if (!obj.classes) return

      if (obj.elements) {
        obj.elements.map((element) => {
          let el = element

          if (typeof element === types.string) {
            el = document.querySelector(element)
          }

          obj.classes.map((classEl) => {
            if (obj.removeFromElements) {
              obj.removeFromElements.map((removeFromElement) => {
                let removeFromEl = removeFromElement

                if (typeof removeFromElement === types.string) {
                  removeFromEl = document.querySelector(element)
                }

                removeFromEl.classList.remove(classEl)
                removeFromEl.disabled = false
              })
            }

            if (obj.initialClass) {
              el.className = obj.initialClass
            }

            if (toggle) {
              switch (toggle) {
                case toggleValue.on:
                  el.classList.add(classEl)
                  el.disabled = false
                  break
                case toggleValue.off:
                  el.classList.remove(classEl)
                  el.disabled = true
                  break

                default:
                  break
              }
            } else {
              el.classList.add(classEl)
            }
          })
        })
      } else {
        obj.classes.map((classEl) => {
          if (obj.removeFromElements) {
            obj.removeFromElements.map((removeFromElement) => {
              let removeFromEl = removeFromElement

              if (typeof removeFromElement === types.string) {
                removeFromEl = document.querySelector(element)
              }

              removeFromEl.classList.remove(classEl)
              removeFromEl.disabled = false
            })
          }
        })
      }
    })
  }

  if (delay) return setTimeout(helperLogic, delay)
  helperLogic()
}
```

Due to the very similarity of logic to the previous helper, I will not focus on its description here.

<br/>

To understand how to use this helper in practice, below is an example of its use in move method of Messenger object:

```js
//scripts/objects/Messenger.js file:

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
```

As we can see above, the use of this helper is also very similar to the setClassesFn helper (for example, in this case, we are not passing the toggle parameter). The difference is that instead of classes, we list here various properties (in this case style properties) specifying the property name and its value to be set on the elements.

<br/>

### 1.6. setUpperLetterFn

The last helper in the heleprs folder is setUpperLetterFn helper which is responsible for changing the first letter of the passed text to uppercase.

<br/>

Its implementation is shown below:

```js
//scripts/helpers/setUpperLetterFn.js file:

export default ({ text }) => {
  if (text) return text.charAt(0).toUpperCase() + text.slice(1)
}
```

As we can see above, this is a simple function that destructs an object into a text and, through a little logic, changing the first letter of this text to uppercase (if nothing was passed to the function, the logic would not execute).

<br/>

### 3.1.3. The structure of styles

The styles (folder) have been grouped into two folders: main, in which there are styles for individual components on the page, and global, in which there are styles that are global for app.

<br/>

Below is an example of the style structure:

![](images/readme/stylesStructure.jpg)

<br/>

Main styles are defined in the variables.css file (in global folder), which are then dynamically used in the application by the classes defined in the helpers.css file (in global folder).

<br/>

Due to the optimization of loading css files, their loading was placed in the head section in html files:

```html
<!-- index.html file: -->

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Talking to Gisapia and the Others</title>
  <link rel="stylesheet" href="styles/global/helpers.css" />
  <link rel="stylesheet" href="styles/global/keyframes.css" />
  <link rel="stylesheet" href="styles/global/normalize.css" />
  <link rel="stylesheet" href="styles/global/variables.css" />
  <link rel="stylesheet" href="styles/main/background.css" />
  <link rel="stylesheet" href="styles/main/characters.css" />
  <link rel="stylesheet" href="styles/main/messenger.css" />
  <link rel="stylesheet" href="styles/main/privatePolicy.css" />
  <link rel="stylesheet" href="styles/main/selectCharUI.css" />
</head>
```

<br/>

### 3.1.4. The structure of js objects and their methods

Due to the fact that most of the code was written in an object-oriented way, the structure of js files looks like this:

![](images/readme/jsStructure.jpg)

<br/>

Each file (except scripts/index.js) corresponds to a specific class (some have been grouped for better readability) that contains properties and methods that are used mostly in the main js file named index.js.

<br/>

In the case of the structure of the methods of given classes is very similar, which facilitates its development and maintenance. Below are code examples of two objects:

```js
//objects/messenger/Messenger.js file:

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

  //more code here...
}

export default Messenger
```

<br/>

```js
//objects/messenger/MessengerScreen.js file:

class MessengerScreen {
  constructor({ container, objects }) {
    this.memory = objects.memory
    this.container = container
    this.selectCharUI = objects.selectCharUI
    this.messengerInterface = objects.messengerInterface
    this.charMessagesPart = 0

    this.createElements()
    this.createComponents()

    appendElementsToContainerFn({
      elements: [this.mainComponent],
      container: this.container.getMainContainerInner(),
    })
  }

  createElements() {
    this.mainContainer = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.screen],
    })

    this.screen = createElementFn({
      element: elements.div,
      classes: [classNames.messenger.screenInner],
    })

    this.backIcon = createElementFn({
      element: elements.img,
      classes: [classNames.messenger.backIcon],
      src: src.messenger.backIcon,
      listeners: [
        {
          event: events.click,
          cb: () => this.handleBackIconClick(),
        },
      ],
    })
  }

  createComponents() {
    this.mainComponent = appendElementsToContainerFn({
      elements: [this.screen, this.backIcon],
      container: this.mainContainer,
    })
  }

  //more code here...
}

export default MessengerScreen
```

The above examples show the similarity of the constructors structure, and in methods like createElements (which uses a createElementFn helper to create elements) and createComponents (which uses an appendElementsToContainerFn helper which combines previously created elements into components) of presented objects,

It is also worth mentioning that individual components that we see on the page (messenger and selectCharUI) are attached to the main container element with app id through appropriate objects (Messenger, MessengerInterface, MessengerScreen and SelectCharUI) methods.

<br/>

Below is an example of the main html file with main container element:

```html
<!-- index.html file: -->

<div id="app" class="wrapper">
  <div class="characters">
    <object
      data="/images/characters/gisapia/character.svg"
      type="image/svg+xml"
      id="gisapia"
    ></object>
  </div>
</div>
```

As we can see above, only the element with characters class containing object element is placed inside the container element with app id due to easier handling of animations which will be discussed later.

<br/>

### 3.1.5. The structure of the app logic

Most of the app logic has been designed to make it easy to understand how it works. To illustrate the app structure, below is an example of the function handleCharTalkingMain, which is the main function in index.js that contains the character's talking logic:

```js
//scripts/index.js file:

const handleCharTalkingMain = async () => {
  const chosenChar = memory.getChar()
  const talkingStep = memory.getTalkingStep()
  const currentScriptTalkCategory = chosenChar.getCurrentScriptTalkCategory({
    conversationStep: talkingStep,
  })
  const scriptTalkCategories = chosenChar.getScriptTalkCategories()
  let userMessage = memory.getUserMessage()

  if (memory.getIsCharTalkingFinish())
    return await handleCharTalkingFinish({ userMessage, chosenChar })

  let scriptTalkMessages

  if (userMessage) {
    const foundWordInCharMemory = chosenChar.checkUserMessageInMemory({
      scriptCategory: currentScriptTalkCategory,
      message: userMessage,
    })
    if (foundWordInCharMemory) {
      handleCharTalkingWhenCharFoundWord({
        chosenChar,
        currentScriptTalkCategory,
        memory,
        foundWordInCharMemory,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.answers,
        type: answerTypes.isInMemory,
        category: currentScriptTalkCategory,
      })
    } else if (memory.getIsCharListening()) {
      handleCharTalkingDuringCharListening({
        chosenChar,
        currentScriptTalkCategory,
        memory,
        userMessage,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.answers,
        type: answerTypes.isAddedToMemory,
        category: currentScriptTalkCategory,
      })
    } else {
      handleCharTalkingWhenCharNotFoundWord({
        chosenChar,
        currentScriptTalkCategory,
        memory,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.answers,
        type: answerTypes.isNotInMemory,
        category: currentScriptTalkCategory,
      })
    }
  } else {
    handleCharTalkingWithoutUserMessage({
      chosenChar,
      currentScriptTalkCategory,
    })
    scriptTalkMessages = chosenChar.getScriptTalkMessages({
      from: common.messages,
      category: currentScriptTalkCategory,
    })
  }

  await handleCharTalkingDuringCharTyping({
    chosenChar,
    scriptTalkMessages,
    messengerScreen,
  })

  if (currentScriptTalkCategory === scriptTalkCategories.summary) {
    memory.setIsCharTalkingFinish(true)
  }

  if (memory.getIsCallCharTalkingAgain()) {
    memory.setIsCallCharTalkingAgain(false)
    memory.increaseTalkingStep()
    handleCharTalkingMain()
  } else {
    messengerInterface.toggleActivePanel(toggleValue.on)
    messengerScreen.toggleShowBackIcon(toggleValue.on)
  }
}
```

As we can see above, it is quite a large function which, in addition to the sequence of appropriate methods of various objects, contains functions that divide the logic of the function in question into smaller parts (for better readability). In the section named specific, some of the logic presented will be explained in more detail.

<br/>
<br/>

## 3.2. Specific

In this section, I would like to focus on describing the most important logic that occurs in the app.

<br/>

### 3.2.1. Matrix background

In the project, to increase the user experience, a background was created that imitates the background of the matrix film in a slightly different color.

<br/>

Below is a visual example of this solution:

![](images/readme/matrixBackground.gif)

<br/>

In order to be able to get the phenomenon shown in the example above, the Background object with many methods was created:

```js
//objects/Background.js file:

class Background {
  constructor() {
    this.canvas = document.getElementById(elements.canvas)
    this.cxt = canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.chinese = chineseString
    this.chinese = this.chinese.split('')
    this.font_size = 20
    this.columns = this.canvas.width / this.font_size
    this.drops = this.addDrops()

    this.draw({ time: 33 })
    this.resize()
  }

  resize() {
    window.addEventListener(events.resize, () => {
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

  draw({ time }) {
    setInterval(() => {
      this.cxt.fillStyle = colors.animationBackground
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.cxt.fillStyle = colors.animationCharacters
      this.cxt.font = `${this.font_size}px ${fonts.arial}`

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
```

The whole above solution is based on infinitely creating characters (on created canvas element) depending on the screen width using the setInterval function in draw method.

Due to the possible change of the screen width when using the apps, a method resize has been created that starts the character creation process from the beginning during changing screen to avoid resolution distortions.

<br/>

### 3.2.2. GSAP for Gisapia animation

The app uses GSAP animation to animate Gisapia svg image (one of the characters to talk to) to enhance user experiene.

<br/>

Below is a visual representation of this solution:

![](images/readme/gsap.gif)

<br/>

The code-side solution looks like this:

```js
//objects/GisapiaAnimation.js file:

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
```

We can see in the example above many methods (which use the TimelineMax object with methods) that are responsible for the looping movement of individual parts of the character. Animation involves the movement of the lips, hair, right hand and hair.

<br/>

### 3.2.3. Inheritance of traits by any character

There are 3 characters in the app that we can chat with. Due to the very high similarity of character traits, a general object called Character was created, from which each character inherits the traits.

<br/>

The following is an example of a partial implementation of a Character object:

```js
//objects/characters/Character.js file:

class Character {
  constructor(scriptTalk, email, memory) {
    this.scriptTalk = scriptTalk
    this.email = email
    this.memory = memory
    this.modifiedScriptTalk = {}
    this.modifiedEmail = {}
  }

  setScriptTalk() {
    const lng = this.memory.getLanguage()

    let scriptTalkCopy = JSON.parse(JSON.stringify(this.scriptTalk))

    this.modifiedScriptTalk = this.setScriptTalkMessages(scriptTalkCopy[lng])
    console.log(this.modifiedScriptTalk)
  }

  changeTimeForTyping(time) {
    const timeForReduceTyping = 100 * Math.floor(Math.random() * 10 + 5)
    const result = time - timeForReduceTyping

    return result < 1000 ? 1000 : result
  }

  getScriptTalkMessages({ category, from, type }) {
    switch (from) {
      case common.messages:
        return this.modifiedScriptTalk[category][common.messages]
      case common.answers:
        return this.modifiedScriptTalk[category][common.answers][type]
      default:
        break
    }
  }

  getScriptTalkCategories() {
    const categories = {}
    Object.keys(this.modifiedScriptTalk).map(
      (categoryName) => (categories[categoryName] = categoryName)
    )

    return categories
  }

  countTypingQuantity({ messageLength }) {
    let result

    if (messageLength < 20) {
      result = 1
    } else if (messageLength < 80) {
      result = 2
    } else {
      result = 3
    }

    return result
  }
}

export default Character
```

The solutions used in the discussed object appear in each of the available characters, so instead of unnecessarily duplicating the code in each object of a given character (Gisapia, Hookin, Reduxon), one object was created, from which the features are inherited.

<br/>

Below is an example of inheritance by a Gisapia object:

```js
//objects/characters/Gisapia.js file:

class Gisapia extends Character {
  constructor(scriptTalk, email, memory) {
    super(scriptTalk, email, memory)
    this.name = charNames.Gisapia
    this.avatar = src.characters.gisapia.avatar
  }
}

export default Gisapia
```

As we can see above, it is a simple object that only contains the properties associated with the Gisapia character.

<br/>

### 3.2.4. **FACTORY DESIGN PATTERN** when selecting a character

Each character object in the app is created when creating an instance of the CharsFactory object and passed outside using the getChar method when the character is selected by the user.

<br/>

The example below shows discussed object:

```js
//objects/CharsFactory.js file:

class CharsFactory {
  constructor({ objects }) {
    this.gisapia = new Gisapia(gisapiaScriptTalk, gisapiaEmail, objects.memory)
    this.hookin = new Hookin(hookinScriptTalk, hookinEmail, objects.memory)
    this.reduxon = new Reduxon(reduxonScriptTalk, reduxonEmail, objects.memory)
  }

  getChar(charName) {
    switch (charName) {
      case charNames.Gisapia:
        return this.gisapia
      case charNames.Hookin:
        return this.hookin
      case charNames.Reduxon:
        return this.reduxon
      default:
        break
    }
  }
}

export default CharsFactory
```

As we can see in the above example, each character receives:

- initial data in the form of a script talk template (used during character talking),
- email template (finally sent to the user email),
- global memory (singleton to save data).

<br/>

Each of the objects passed into the Characters object instance will be discussed later.

<br/>

The use of getChar method of CharsFactory that returns the appropriate character object instance on the basis of character name is shown below in handleCharSelect function in main js file:

```js
//scripts/index.js file:

const handleCharSelect = (charName) => {
  const chosenChar = charsFactory.getChar(charName)
  memory.setSelectedChar(chosenChar)
  selectCharUI.toggleReadyStartCharTalkingBtn(common.toggle.on)
}
```

As we can see above, the returned value (instance of the character object) of the getChar method of charsFactory object is assigned to the chosenChar variable. Then, as we can see from the example, this instance can be passed on global memory by setSelectedChar method of memory object.

<br/>

Summarizing, thanks to this design pattern, we can easily and in legible way obtain specific data (in this case instance of the character object), which we then use within the app.

<br/>

### 3.2.5. **SINGLETON DESIGN PATTERN** while saving the settings

To handle data and settings throughout the entire project, the Singleton design pattern was used.
Thanks to this, we have one place that stores data (one instance of object) related to the use of the app.

<br/>

Below is an example of this solutionn in a fragment of the Memory object:

```js
//objects/Memory.js file:

class Memory {
  constructor() {
    if (Memory.instance == null) {
      this.charMemory = charMemory
      this.character = null
      this.userMessage = null
      this.isCallCharTalkingAgain = false
      this.isCharListening = false
      this.isCharTalkingFinish = false
      this.talkingStep = 0
      this.aboutUser = {}
      this.lngSubscribers = []
      this.language = this.setLanguage()

      this.backgroundAnimation()
      this.gisapiaAnimation()
      this.createAudio()

      Memory.instance = this
    }

    return Memory.instance
  }

  backgroundAnimation() {
    new Background()
  }

  gisapiaAnimation() {
    new GisapiaAnimation()
  }

  createAudio() {
    this.typingAudio = createElementFn({
      element: elements.audio,
      src: src.audio.typing,
    })

    this.chatBubbleAudio = createElementFn({
      element: elements.audio,
      src: src.audio.chatBubble,
    })

    this.fallDownAudio = createElementFn({
      element: elements.audio,
      src: src.audio.throw,
    })

    this.backgroundAudio = createElementFn({
      element: elements.audio,
      src: src.audio.background,
    })

    this.finishAudio = createElementFn({
      element: elements.audio,
      src: src.audio.finish,
    })

    this.clickAudio = createElementFn({
      element: elements.audio,
      src: src.audio.click,
    })
  }

  playClickAudio() {
    this.clickAudio.play()
  }

  playTypingAudio() {
    this.typingAudio.play()
  }

  playChatBubbleAudio() {
    this.chatBubbleAudio.play()
  }

  playFallDownAudio() {
    this.fallDownAudio.play()
  }

  increaseTalkingStep() {
    this.talkingStep++
  }

  getTalkingStep() {
    return this.talkingStep
  }

  setUserMessage(message) {
    this.userMessage = message
  }
}

const memory = new Memory()

export default memory
```

In the constructor of the discussed object, we see that an instance of this object can be created only once (singleton design pattern) and we also see a lot of properties that we can overwrite or return to the rest of the app through various methods (for example increaseTalkingStep, getTalkingStep, setUserMessage).

Also in the example shown, we can see that various audio elements are created by createAudio method, which are handled by very simple methods (for example playClickAudio method).

<br/>

Below is an example of using Memory object methods in a fragment of handleCharTalkingDuringCharListening function:

```js
//scripts/index.js file:

const handleCharTalkingDuringCharListening = ({
  chosenChar,
  currentScriptTalkCategory,
  memory,
  userMessage,
}) => {
  memory.setUserMessage('')
  memory.setIsCallCharTalkingAgain(true)
  memory.setIsCharListening(false)
  memory.addDataToAboutUser({
    scriptCategory: currentScriptTalkCategory,
    word: userMessage,
  })
}
```

As we can see in the above example in the handleCharTalkingDuringCharListening function:

- the value entered by the user is cleared (by setUserMessage method),
- the option of restarting the conversation function is set to true (by setIsCallCharTalkingAgain method),
- listening by the character is set to false (by setIsCharListening method),
- the appropriate user data has been added (by addDataToAboutUser method).

<br/>

Summarizing, the role of the memory object (singleton) is to save and store various app settings.

<br/>

### 3.2.6. **OBSERVER DESIGN PATTERN** during various events

Due to the possibility of choosing several options, the design pattern called Observer was introduced in the project.

The app logic subscribe for events such as the character selection, specific language selection or sending messages by the user and in the effect sends the appropriate value (the chosen character, language or user message) to the subscriber (function or method) after such events.

<br/>

To illustrate exactly how this design pattern works, below is a fragment of scripts/index.js file, in which there is a function that is subscribed by one of the methods of the MessengerInterface object and the entire implementation responsible for the logic (methods of the MessengerInterface object) related to calling a given subscriber:

```js
//scripts/index.js file:

  const handleUserTalking = (userMessage) => {
    const chatBubble = messengerScreen.createChatBubbleComponent({
      message: userMessage,
      whoTalking: { name: common.user },
    })
    memory.setUserMessage(userMessage)
    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreen()
    messengerScreen.increaseCharMessagesPart()
    messengerScreen.toggleShowBackIcon(toggleValue.off)
    messengerInterface.toggleActivePanel(toggleValue.off)
    handleCharTalkingMain()
  }

  messengerInterface.subscribe({ subscriber: handleUserTalking })



//objects/MessengerInterface.js file:

class MessengerInterface {
   constructor({ container, objects }) {
    this.inputValue = ''
    this.subscribers = []
  }

  createElements() {
      this.button = createElementFn({
      element: elements.button,
      textContent: commands.send[lng],
      disabled: true,
      classes: [classNames.messenger.interfaceBtn],
      styles: [
        {
          name: styleProps.names.pointerEvents,
          value: styleProps.values.none,
        },
      ],
      listeners: [
        {
          event: events.click,
          cb: () => this.handleButtonClick(),
        },
      ],
    })

    this.input = createElementFn({
      element: elements.input,
      disabled: true,
      classes: [classNames.messenger.interfaceInput],
      listeners: [
        {
          event: elements.input,
          cb: (e) => this.handleInputTyping(e),
        },
        {
          event: events.keypress,
          cb: (e) => this.handleInputKeypress(e),
        },
      ],
    })
  }

  subscribe({ subscriber }) {
    this.subscribers.push(subscriber)
  }

  callSubscribers() {
    this.subscribers.map((subscriber) => subscriber(this.inputValue))
  }

  handleInputKeypress(e) {
    e.key === common.Enter &&
      this.isCorrectInputValue() &&
      this.callSubscribers()
  }

   handleButtonClick() {
    this.isCorrectInputValue() && this.callSubscribers()
  }
```

As we can see above, first the handleUserTalking function is subscribed to the subscribe method of the MessengerInterface object.

Next, in the case of the MessengerInterface object, the subscribe method adds mentioned function to the this.subscribers array in the object's constructor.

Through the event keypress set on the created this.input element or the event click set on the created this.buttn element in the createElements method, the handleInputKeypress or handleButtonClick method is called, which, in addition to the isCorrectInputValue method (validates the entered value for input), calls the callSubscribers method, which passes to the mentioned function the value that was entered into the input.

Thanks to this solution, the sent user message goes to the handleUserTalking function, where it is used for further app logic.

</br>

### 3.2.7. Character talk script and email templates

Each character (Gisapia, Hookin, Reduxon) in the app has its own talk script and email template in two languages (PL/ENG).

<br/>

Below is a fragment of the Gisapia talk script template (PL/ENG) with messages and answers to the user's:

```js
//data/characters/gisapia/scriptTalk.js file:

export default {
  pl: {
    name: {
      messages: [
        [
          'Cześć 😊',
          `nazywam się Gisapia`,
          `bardzo mi miło, że będę mogła z Tobą porozmawiać! 😎. Powiedz mi proszę jak Ci na imię?`,
        ],
        [
          'Cześć, cześć! 😊',
          'w internecie mówią na mnie Gisapia',
          'A Ty jak masz na imię? 😎',
        ],
      ],

      answers: {
        isInMemory: [
          [
            `-userName-? Naprawdę -userName-??? Moja znajoma osoba ma tak na imię! 😋`,
            `eh... ostatnio się trochę pokłócilismy 😐, ale to raczej chwilowe! 😉`,
            'dobra, nie było tematu bo się rozgadam!',
          ],
          [
            '2 lata temu rozmawiałam z osobą, która miała na imię -userName-',
            'bardzo fajna i atrakcyjna osoba... 😏',
            'ale już niestety cisza po tamtej stronie... 😓',
          ],
        ],

        isNotInMemory: [
          [
            'kurcze.. Szukam i szukam w pamięci, ale nie mogę skojarzyć... 😞',
            'jak napiszesz jeszcze raz swoje imię bez dodatkowych znaków to dodam je do pamięci i będę się tak do Ciebie potem zwracać 😊',
          ],
          [
            'wiesz co trochę osób się przewinęło przez moją pamięć, ale tego imienia niestety nie kojarzę... 😞',
            'jak napiszesz je jeszcze raz bez dodatkowych znaków to dodam je do pamięci i będę się tak do Ciebie potem zwracać 😊',
          ],
        ],
        isAddedToMemory: [
          [
            'chwilka! 🙂',
            `już sobie zapisuje imię -userName- w pamięci!`,
            'no i jest! 😎',
          ],
          [
            'poczekaj chwilkę proszę... 🙂',
            'no i jest, imię -userName- zostało zapisane w mojej pamięci! 😎',
          ],
        ],
      },
    },

  //more code here...
  }

  eng: {
    name: {
      messages: [
        [
          'Hi 😊',
          `my name is Gisapia`,
          `I am very pleased to be able to talk to you! 😎. Please tell me what is your name?`,
        ],
        [
          'Hi Hi! 😊 ',
          'they call me Gisapia on the internet',
          `And what's your name? 😎 `,
        ],
      ],

      answers: {
        isInMemory: [
          [
            `-userName-? Really -userName- ??? My friend's name is that! 😋`,
            `eh ... we had a bit of a fight lately 😐, but it's rather temporary! 😉`,
            `okay, there was no topic because I'll talk to you!`,
          ],
          [
            '2 years ago I spoke to the person whose name was -userName-',
            `very cool and attractive person ... 😏`,
            `but unfortunately there is silence on the other side ... 😓`,
          ],
        ],

        isNotInMemory: [
          [
            `crap .. I'm looking and searching in my memory, but I can't match ... 😞`,
            'if you write your name again without additional signs, I will add it to my memory and I will refer to you later 😊',
          ],
          [
            `you know what a few people have passed through my memory, but unfortunately I don't know this name ... 😞`,
            'if you write them again without additional characters, I will add them to my memory and I will refer to you later 😊',
          ],
        ],
        isAddedToMemory: [
          [
            'wait! 🙂 ',
            `is already storing the name -userName- in memory!`,
            'there it is! 😎 ',
          ],
          [
            'wait a minute please ... 🙂',
            'here it is, the name -userName- has been saved in my memory! 😎 ',
          ],
        ],
      },
    },

  //more code here...
  }
```

<br/>

Also below is a fragment of the email template (PL/ENG) which is finally sent by my backend application [Emails Handler](https://github.com/damian-lis/Emails-handler) to the user's email:

```js
//data/characters/gisapia/email.js file:

export default {
  pl: {
    from: 'gisapiaJS@gmail.com',
    subject: '-userName- patrz co udało mi się zapamiętać!',
    html: `
            <p> Hej -userName- tutaj Gisapia! </p>
            <div style="height:5px"></div>
            <p>Zgodnie z obietnicą przesyłam informacje jakie udało mi się zapamiętać. 😉</p>
            <p>Więc tak, masz na imię <strong>-userName-</strong> ,</p>
            <p>Twoja miejscowość zamieszkania to <strong>-userOrigin-</strong> </p>
            <p>hobby jakie uprawiasz w wolnym czasie to <strong>-userHobby-</strong> </p>
            <p>Chyba dobrze się spisałam co nie? 😃</p>
            <div style="height:5px"></div>
            <p>Dzięki wielkie za rozmowę, dobrze się bawiłam! 😎</p>
            <p>Mam nadzieję, że Ty również 😋!</p>
            `,
  },
  eng: {
    from: 'gisapiaJS@gmail.com',
    subject: '-userName- look what I was able to remember!',
    html: `
            <p> Hey -userName-, this is Gisapia! </p>
            <div style="height:5px"></div>
            <p>As promised, I am sending information that I can remember. 😉</p>
            <p>So yeah, Your name is <strong>-userName-</strong>,</p>
            <p>Your city of residence is <strong>-userOrigin-</strong>,</p>
            <p>the hobby You do in Your spare time is <strong>-userHobby-</strong>, </p>
            <p>I think that I did well did not? 😃</p>
            <div style="height:5px"></div>
            <p>Thanks so much for the interview, had a good time! 😎</p>
            <p>I hope You too 😋!</p>
            `,
  },
}
```

In the first example regarding to gisapia talk script template example, first of all we can see messages appear in two arrays. Thanks to this, each character who starts a conversation can draw different messages for themselves (so that the conversation is not the same).

<br/>

The discussed process of drawing messages is done by the setScriptTalkMessages method of Character object when user starting a conversation with a choosen character:

```js
//objects/Character.js file:

  setScriptTalkMessages(scriptTalk) {
    for (const category in scriptTalk) {
      const messageNumber = Math.floor(
        Math.random() * scriptTalk[category][common.messages].length
      )
      const selectedMessage =
        scriptTalk[category][common.messages][messageNumber]

      scriptTalk[category][common.messages] = selectedMessage

      for (const answerVariants in scriptTalk[category][common.answers]) {
        const answerNumber = Math.floor(
          Math.random() *
            scriptTalk[category][common.answers][answerVariants].length
        )
        const selectedAnswer =
          scriptTalk[category][common.answers][answerVariants][answerNumber]

        scriptTalk[category][common.answers][answerVariants] = selectedAnswer
      }
    }
    return scriptTalk
  }
```

As we can see above, thanks to the use of arrays in script talk template, by the setScriptTalkMessages method (using floor and random methods of Math object.), we can easily draw messages/answers in passed script.

<br/>

Below is an example of using above method in the setScriptTalk method of Character object, which is called by handleInitialSettings function (only a fragment of this function is presented below):

```js
  //scripts/index.js file:

  const handleInitialSettings = () => {
    chosenChar.setScriptTalk()
  }


  //objects/Character.js file:

  setScriptTalk() {
    const lng = this.memory.getLanguage()
    let scriptTalkCopy = JSON.parse(JSON.stringify(this.scriptTalk))

    this.modifiedScriptTalk = this.setScriptTalkMessages(scriptTalkCopy[lng])
  }
```

As we see in the above example:

- the handleInitialSettings function calls the setScriptTalk method of Character object,
- the selected language by the user is returned (via the getLanguage method of Memory object),
- a copy of the original script is created (scriptTalkCopy),
- this copy is randomly set (in choosen language) by mentioned earlier setScriptTalkMessages method (so as not to overwrite the original - this.scriptTalk).

<br/>

Another thing You could see in the talk script and email template is that some words are surrounded by "-" character. In this parts of script are added user answers to make the conversation with a given character seem more natural (for example user name, hobby and origin).

<br/>

Below is an example of a changeScriptTalkMessages method with accompanying methods of Character object which allows to dynamically change script talk template based on user data:

```js
//objects/Character.js file:

changeScriptTalkMessages({ category, from, type }) {
  const wordsToSearchAndReplace = this.setWordsToSearchAndReplace()

  if (wordsToSearchAndReplace.length === 0) return

  switch (from) {
    case common.messages:
      this.modifiedScriptTalk[category][
        common.messages
      ] = this.findWordAndReplace({
        wordsSets: wordsToSearchAndReplace,
        texts: this.modifiedScriptTalk[category][common.messages],
      })
      break

    case common.answers:
      this.modifiedScriptTalk[category][common.answers][
        type
      ] = this.findWordAndReplace({
        wordsSets: wordsToSearchAndReplace,
        texts: this.modifiedScriptTalk[category][common.answers][type],
      })

    default:
      break
  }
}

setWordsToSearchAndReplace() {
    return Object.keys(this.memory.getAboutUser()).map((scriptCategory) => {
      return {
        search: `-${common.user}${setUpperLetterFn({ text: scriptCategory })}-`,
        replace: this.memory.getAboutUser({ scriptCategory }),
      }
    })
}

findWordAndReplace({ wordsSets, texts }) {
  const textsCopy = texts

  switch (typeof texts) {
    case types.object:
      for (const text in textsCopy) {
        wordsSets.forEach((wordSet) => {
          if (textsCopy[text].includes(wordSet.search)) {
            const regexp = new RegExp(wordSet.search, reg.modifiers.gi)
            textsCopy[text] = textsCopy[text].replace(regexp, wordSet.replace)
          }
        })
      }

      break
    default:
      textsCopy.map((text) => {
        wordsSets.forEach((wordSet) => {
          if (text.includes(wordSet.search)) {
            const regexp = new RegExp(wordSet.search, reg.modifiers.gi)
            text = text.replace(regexp, wordSet.replace)
          }
        })
        return text
      })

      break
  }

  return textsCopy
}
```

As we can see in the example above, to changeScriptTalkMessages method is passed the category of conversation (category), the place where the exchange should take place (from) and the type of answer(type).

The setWordsToSearchAndReplace method is performed first in which we can determine the words to be found (with "-" character) and we can determine which words will replace the found ones (based on the data returned by the getAboutUser method of the Memory object). This method returns an array of objects that contain words surrounded by "-" to be replaced with words from the user.

If the given words are not created then the entire method is returned. Otherwise, by the findWordAndReplace method, the script fragments (texts) passed to it is modified based on the passed data mentioned earlier (wordsSets). As a result, a given fragment of the script is overwritten by the modified one that already contains information from the user.

<br/>

When modifying the email template, the addUserDataToEmail method was created which works in a similar way to the changeScriptTalkMessages method. Below is an example of the mentioned methods:

```js
//objects/Character.js file:

  addUserDataToEmail({ lng, recipient }) {
    let emailCopy = JSON.parse(JSON.stringify(this.email[lng]))
    const wordsToSearchAndReplace = this.setWordsToSearchAndReplace()
    this.modifiedEmail = this.findWordAndReplace({
      wordsSets: wordsToSearchAndReplace,
      texts: emailCopy,
    })

    this.modifiedEmail.to = recipient
  }
```

As we can see above, the addUserDataToEmail method uses the same methods as in the previous case discussed.

<br/>

Below are two visual examples of the changed talk script messages (Gisapia (PL)/Reduxon (ENG)):

![](images/readme/scriptTemplateExample.jpg)

<br/>

![](images/readme/scriptTemplateExample2.jpg)

<br/>

Below are two visual examples of the changed email template messages (Gisapia (PL)/Reduxon (ENG)):

![](images/readme/gisapiaMailHeader.jpg)

<br/>

![](images/readme/gisapiaMail.jpg)

<br/>

![](images/readme/reduxonMailHeader.jpg)

<br/>

![](images/readme/reduxonMail.jpg)

<br/>

### 3.2.8. The way of writing a message

In the app introduced a feature that allows each character to imitate writing in the form of an animation of jumping dots which delays the display of the character's message.

<br/>

Below is a visual example of this feature:

![](images/readme/typing.gif)

<br/>

This solution is supported by function handleCharTalkingDuringCharTyping with various methods of Character and MessengerScreen objects.

<br/>

The implementation of this function is shown below:

```js
//scripts/index.js file:

const handleCharTalkingDuringCharTyping = async ({
  chosenChar,
  scriptTalkMessages,
  messengerScreen,
}) => {
  for (let i = 0; i < scriptTalkMessages.length; i++) {
    const charMessage = scriptTalkMessages[i]
    let timeForTyping = chosenChar.countTimeForTyping({
      messageLength: charMessage.length,
      speed: 80,
    })
    const typingQuantity = chosenChar.countTypingQuantity({
      messageLength: charMessage.length,
    })

    for (let i = 0; i < typingQuantity; i++) {
      if (i >= 1) {
        timeForTyping = chosenChar.changeTimeForTyping(timeForTyping)
      }

      await chosenChar.mustThink({ time: 1000 })
      await messengerScreen.showTyping({
        time: timeForTyping,
        charName: chosenChar.name,
      })
    }

    const chatBubble = messengerScreen.createChatBubbleComponent({
      message: charMessage,
      whoTalking: chosenChar,
    })

    messengerScreen.attachToMessengerScreen(chatBubble)
    messengerScreen.scrollMessengerScreen()
  }
}
```

As we can see in the above example in this function, each creation of a specific message based on the talk script (by createChatBubbleComponent method of MessengerScreen object) is delayed by imitating the character's thinking (by mustThink method of Character object)and animating jumping dots (by showTyping method of MessengerScreen object).

The length of the animation (timeForTyping variable) and its quantity (typingQuantity variable) is determined by the length of the specific message from the talk script template to reflect the natural way of writing.

<br/>

Below is an example of a method that displays animated balls that imitate character writing:

```js
//objects/MessengerScreen.js file:

  async showTyping({ time, charName }) {
    this.memory.playTypingAudio()
    const loader = this.createLoaderComponent({ charName })
    this.attachToMessengerScreen(loader)
    this.scrollMessengerScreen()
    setTimeout(() => this.removeLoader(loader), time)
    await new Promise((resolve) => setTimeout(resolve, time))
  }
```

In the example above, you can see that the balls are in the form of a loader that is created for a certain period of time (by createLoaderComponent method) with the screen scrolls down (by scrollMessengerScreen method), after which it is remove (by removeLoader method).

The whole solution related to stopping the handleCharTalkingDuringCharTyping function mentioned earlier is possible thanks to the introduction of the so-called waiting for promise resolve after a certain time (duration of animated jumping balls) in discussed method.

At the end of the handleCharTalkingDuringCharTyping function after the balls animation, a chatBubble (the appearance of the chat depends on the interlocutor) is created (by createChatBubbleComponent method), this chatBubble is attached to the messenger screen (by attachToMessengerScreen method) and messenger screen is scroll down (scrollMessengerScreen method).

<br/>

In the case of creating a message by a user, some of the solutions are the same, except for delaying sending the message. Below is an example of a function that is called when the user sends a message (this example was discussed when discussing the observer design pattern):

```js
//scripts/index.js file:

const handleUserTalking = (userMessage) => {
  const chatBubble = messengerScreen.createChatBubble(userMessage, {
    name: 'user',
  })
  memory.setUserMessage(userMessage)
  messengerScreen.attachToMessengerScreen(chatBubble)
  messengerScreen.scrollMessengerScreenContainer()
  messengerScreen.increaseCharMessagesPart()
  messengerScreen.toggleShowBackBtn('off')
  messengerInterface.toggleActivePanel('off')
  handleCharTalking()
}
```

As we can see in the example above, the handleUserTalking function uses similar solutions.

<br/>

### 3.2.9. Adding words to character memory

After characters monologue, each of them asks a question that the user has to answer in some way.

If in the user's response a given character finds a word that is stored in its memory, it will display a message that it knows the word (it will also add this word to the memory as information about the user).

<br/>

Below is an visual example how it works:

![](images/readme/isInMemory.gif)

If, in the user's response, the character does not find the word that he has stored in memory, the character will ask the user to write the word, which the character will then add to memory about user.

<br/>

Below is an visual example how it works:

![](images/readme/isNotInMemory.gif)

<br/>

The following is a example of collection of various data that the characters use when analyzing user responses:

```js
//data/characters/gisapia/memory.js file:

export default {
  name: [
    'Anna',
    'Ania',
    'Maria',
    'Katarzyna',
    'Kasia',
    'Małgorzata',
    'Małgosia',
    'Agnieszka',
    //more code...
  ],

  origin: [
    'Warszawa',
    'Warszawy',
    'Kraków',
    'Krakowa',
    'Łódź',
    //more code...
  ],

  hobby: [
    'podróżowanie',
    'podróże',
    'wędkowanie',
    'wędkować',
    'góry',
    'sport',
    'aktywność fizyczna',
    'czytanie książek',
    'robótki ręczne',
    'majsterkowanie',
    'physical activity',
    'reading books',
    'needlework',
    'DIY',
    'modeling',
    'modeling',
    //more code...
  ],
}
```

As we can see in the above example, it is a collection of certain data in various categories (name, origin and hobby).

</br>

On the logic side of the app, it looks like we have several variants of answers that are activated depending on whether a message has been sent from the user or not, whether a given word has been found in the character's memory or not and whether the character is currently listening to a message from the user or not.

<br/>

An example of this logic is below and it is part of the handleCharTalkingMain function:

```js
//scripts/index.js file:

const handleCharTalkingMain = async () => {
  s
  let scriptTalkMessages

  if (userMessage) {
    const foundWordInCharMemory = chosenChar.checkUserMessageInMemory({
      scriptCategory: currentScriptTalkCategory,
      message: userMessage,
    })
    if (foundWordInCharMemory) {
      handleCharTalkingWhenCharFoundWord({
        chosenChar,
        currentScriptTalkCategory,
        memory,
        foundWordInCharMemory,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.answers,
        type: answerTypes.isInMemory,
        category: currentScriptTalkCategory,
      })
    } else if (memory.getIsCharListening()) {
      handleCharTalkingDuringCharListening({
        chosenChar,
        currentScriptTalkCategory,
        memory,
        userMessage,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.answers,
        type: answerTypes.isAddedToMemory,
        category: currentScriptTalkCategory,
      })
    } else {
      handleCharTalkingWhenCharNotFoundWord({
        chosenChar,
        currentScriptTalkCategory,
        memory,
      })
      scriptTalkMessages = chosenChar.getScriptTalkMessages({
        from: common.answers,
        type: answerTypes.isNotInMemory,
        category: currentScriptTalkCategory,
      })
    }
  } else {
    handleCharTalkingWithoutUserMessage({
      chosenChar,
      currentScriptTalkCategory,
    })
    scriptTalkMessages = chosenChar.getScriptTalkMessages({
      from: common.messages,
      category: currentScriptTalkCategory,
    })
  }
}
```

<br/>

In the example above, we can see several functions that support many variant of the conversation logic. An example of one of them is shown and described below:

```js
//scripts/index.js file:

const handleCharTalkingWhenCharFoundWord = ({
  chosenChar,
  currentScriptTalkCategory,
  memory,
  foundWordInCharMemory,
}) => {
  memory.setUserMessage('')
  memory.setIsCallCharTalkingAgain(true)
  memory.addDataToAboutUser({
    scriptCategory: currentScriptTalkCategory,
    word: foundWordInCharMemory,
  })
  chosenChar.changeScriptTalkMessages({
    from: common.answers,
    type: answerTypes.isInMemory,
    category: currentScriptTalkCategory,
  })
}
```

The handleCharTalkingWhenCharFoundWord function shown that is executed when the word in the character's memory matches the word found in the user message (checking the condition of foundWordInCharMemory variable in the handleCharTalkingMain function).

<br/>

In the logic of discussed function we can see that it is responsible for:

- clearing the memory regarding the user's message (by simply setUserMessage method of Memory object),
- setting the option to call the main function again (by simply setIsCallCharTalkingAgain method of Memory object),
- adding the found word to the user memory with related script template category (by simply addDataToAboutUser method of Memory object),
- changing the script template by adding the appropriate word to the right place in the script template (by changeScriptTalkMessages method of Character object which was explained in 3.2.7. subsection).

<br/>

At the moment when a given variant of the logic of the handleCharTalkingMain function is executed (after calling the appropriate functions, e.g. handleCharTalkingWhenCharFoundWord discussed above), the changed script template is returned by simple getScriptTalkMessages method of Character object and assigned to the scriptTalkMessages variable, which is then used to compose the message (handleCharTalkingDuringCharTyping function which was explained in 3.2.8. subsection).

<br/>

### 3.2.10. Sending user data to user by e-mail of selected character

During the conversation, the characters collect data about the user. Depending on whether the user wishes, such data can be sent to the given e-mail via my backend [Emails Handler](https://github.com/damian-lis/Emails-handler) app, which supports the Sendgrid service.

<br/>

Below is an implementation of the handleCharTalkingFinish function which calls the handleCharTalkingDuringSendData async function (also below is an implementation) responsible for sending the email:

```js
//scripts/index.js file:

const handleCharTalkingFinish = async ({ userMessage, chosenChar }) => {
  let messageToSend
  let delayToSend

  if (userMessage.includes('@')) {
    messengerInterface.showSpinnerInsteadBtn()
    messengerInterface.addDelayMessagesToInput({
      delay: 5000,
    })
    const lng = memory.getLanguage()
    chosenChar.addUserDataToEmail({
      lng,
      recipient: userMessage,
    })
    const charEmail = chosenChar.getEmail()

    const { message, delay } = await handleCharTalkingDuringSendData({
      data: charEmail,
    })
    messageToSend = message
    delayToSend = delay
    messengerInterface.clearInput({ withTimeouts: true })
    messengerInterface.showSpinnerInsteadBtn({ invert: true })
  } else {
    messageToSend = messages.finish.withoutMail
    delayToSend = 1000
  }

  handleFinishAnimation({ delay: delayToSend })
  selectCharUI.changeUI({ message: messageToSend })
}

const handleCharTalkingDuringSendData = async ({ data }) => {
  return await fetch(mailEndPoint, {
    method: fetchProps.methods.POST,
    headers: {
      [fetchProps.headers.props.ContentType]:
        fetchProps.headers.values.applicationJson,
    },

    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) =>
      data.success
        ? { message: messages.finish.mailSent, delay: 0 }
        : { message: messages.finish.problemWithServer, delay: 1000 }
    )
    .catch(() => {
      return { message: messages.finish.noConnection, delay: 1000 }
    })
}
```

Due to the fact that the handleCharTalkingDuringSendData async function responsible for sending the e-mail is related to the logic of the handleCharTalkingFinish function, below is a short description of it to understand the whole process.

First of all, if the user passes a message to the handleCharTalkingFinish function containing the @ character, the logic related to sending the email will be executed with support various methods and functions.

<br/>

Below is a chronological description of the logic that is executed when a message containing the @ character is passed to the handleCharTalkingFinish function:

- the button for sending messages is replaced with a spinner that imitates loading by showSpinnerInsteadBtn method of MessengerInterface object,
- a sequence of messages is set that inform the user that the e-mail is about to be delivered by addDelayMessagesToInput method of MessengerInterface object (messages change every 5 seconds),
- the language that the user has set is returned by getLanguage method of Memory object,
- user data is added to the email template by addUserDataToEmail method of Character object (this method was explained in subsection 3.2.7.),
- the previously modified email template is returned by getEmail method of Character object,
- user data is sent to the server by handleCharTalkingDuringSendData function, which, as we can see in the example above, uses the fetch function with the POST method and returns several possible responses from server (when the mail was sent, when there was a problem with the server and when there is no connection to the server) and a delay value that will be used in the function associated with the final animation,
- the values returned from the handleCharTalkingDuringSendData function are assigned to the messageToSend and delayToSend variables,
- the input value is removed along with clearing the setTimeout function, which may not have been performed yet (by clearInput method of Messenger Interface object),
- the spinner is replaced with a button for sending messages by showSpinnerInsteadBtn method of MessengerInterface object which works the opposite of the previous call (invert: true argument).

<br/>

Otherwise, if the message sent to the function handleCharTalkingFinish does not contain the @ character, the message related to information for the user about the unsent e-mail is assigned to the messageToSend variable and the value of 1000 to delayToSend variable (Same process as in the previously discussed case).

At the very end of the handleCharTalkingFinish function when the appropriate data has been assigned to the messageToSend and delayToSend variables, the handleFinishAnimation function is called to which the value of delayToSend is passed, after which the finish animation will be performed and the changeUI method of the SelectCharUI object is called, which sets a messageToSend in the messenger window.

<br/>

Below are some examples of messages the user may receive at the end of the conversation (PL/ENG):

```js
//data/names.js file:

export const messages = {
  finish: {
    mailSent: {
      pl: [`Mail wysłany, sprawdź! 😋`],
      eng: [`Mail sent, check it! 😋`],
    },

    withoutMail: {
      pl: ['Maila nie wysyłam,', 'dzięki za rozmowę 😉'],
      eng: [`I don't send the e-mail,`, `thanks for the interview! 😉`],
    },

    noConnection: {
      pl: [
        `Maila niestety nie otrzymasz bo nie ma połączenia z serwerem... 😕`,
        `Idę to sprawdzić... Tymczasem dzięki za rozmowę! 😉`,
      ],
      eng: [
        `Unfortunately you will not receive e-mail because there is no connection to the server ...`,
        `I'm going to check it out ... In the meantime, thanks for the interview! 😉`,
      ],
    },

    problemWithServer: {
      pl: [
        `Mail niestety nie został wysłany...`,
        `Jakiś problem z serwerem... 😓`,
        `Idę to sprawdzić...`,
        `Tymczasem dzięki za rozmowę! 😉`,
      ],
      eng: [
        ` Mail was unfortunately not sent ... `,
        `Some problem with the server ... 😓`,
        ` I'm going to check it out ... `,
        ` In the meantime, thanks for the interview! 😉`,
      ],
    },
  },
```

<br/>

Below is a visual examples of this answers:

![](images/readme/mailSent.jpg)

<br/>

![](images/readme/mailNotSent.jpg)

<br/>

![](images/readme/noConnection.jpg)

<br/>

![](images/readme/serverProblem.jpg)

<br/>

### 3.2.11. The ability to change characters during the conversation

During the conversation, we have the option of changing a given character to another at every stage while the user has the option of writing a message.

<br/>

Below is a visual example of such a solution:

![](images/readme/backIcon.gif)

In code, this is done by resetting many parameters so that the user can start a conversation with another character again from begining.

<br/>

Below is a example of method that is responsible for the possibility of character re-selection and example of the element through which this method is being called in MessengerScreen object:

```js
//objects/MessengerScreen.js file:

    this.backIcon = createElementFn({
      element: common.elements.img,
      classes: [classNames.messenger.backIcon],
      src: src.messenger.backIcon,
      listeners: [
        {
          event: common.events.click,
          cb: () => this.handleBackIconClick(),
        },
      ],
    })

    handleBackIconClick() {
      this.memory.restart()
      this.memory.playFallDownAudio()
      this.memory.playClickAudio()
      this.selectCharUI.removeCharButtonsActive()
      this.selectCharUI.toggleReadyStartCharTalkingBtn(toggleValue.off)
      this.messengerInterface.toggleActivePanel(toggleValue.off)
      this.selectCharUI.move({
        type: animationSettings.selectCharUI.fromBottomShow,
      })
      this.container.move({
        type: animationSettings.messenger.backToTheTop,
      })
      this.toggleShowBackIcon(toggleValue.off)
    }
```

As we can see above, the handleBackIconClick method calls on the event of a click on the this.backIcon element and this method mainly based on restoring the initial settings of various objects (due to the simple methods occurring in this method, I will not describe them in detail).

<br/>

### 3.2.12. Opportunity to talk again with characters

After the whole conversation with a choosen character, we have the opportunity to talk to any character again.

<br/>

Below is a visual example of this solution:

![](images/readme/talkAgain.gif)

<br/>

Below is a example of method that allows to start a conversation again and example of the element through which this method is being called in SelectCharUi object:

```js
//objects/SelectCharUI.js file:

  this.talkAgainButton = createElementFn({
    element: common.elements.button,
    textContent: commands.talkAgain[lng],
    classes: [
      classNames.selectCharUI.startBtn,
      classNames.selectCharUI.startBtnReady,
    ],
    styles: [
      {
        name: common.styleProps.names.display,
        value: common.styleProps.values.none,
      },
    ],
    listeners: [
      {
        event: common.events.click,
        cb: () => this.handletalkAgainButtonClick(),
      },
    ],
  })


  handleTalkAgainButtonClick() {
    this.memory.restart()
    this.memory.playFinishAudio({ pause: true, reload: true })
    this.memory.playBackgroundAudio({ reload: true })
    this.memory.playClickAudio()
    this.messagesComponent.remove()

    this.changeUI()
    this.removeCharButtonsActive()
    this.toggleReadyStartCharTalkingBtn(toggleValue.off)
  }
```

As we can see above, this method and its way of calling is very similar to the one mentioned in the previous subsection, so I will not focus on explaining it.
