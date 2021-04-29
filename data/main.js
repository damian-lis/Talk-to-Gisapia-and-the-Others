export const common = {
  messages: 'messages',
  answers: 'answers',
  language: 'language',
  selectChar: 'selectChar',
  startTalking: 'startTalking',
  messagesPart: 'messagesPart',
  startAnimation: 'startAnimation',
  regexp: {
    modifiers: {
      gi: 'gi',
    },
  },
  id: 'id',
  main: 'main',
  second: 'second',
  ball: 'ball',
  user: 'user',
  keys: {
    Enter: 'Enter',
  },
  toggle: {
    on: 'on',
    off: 'off',
  },
  language: {
    name: 'language',
    pl: {
      large: 'PL',
      small: 'pl',
    },
    eng: {
      large: 'ENG',
      small: 'eng',
    },
  },
  privatePolicy: {
    pl: 'Polityka prywatności',
    eng: 'Private policy',
  },
  answerTypes: {
    isInMemory: 'isInMemory',
    isNotInMemory: 'isNotInMemory',
    isAddedToMemory: 'isAddedToMemory',
  },
  categories: {
    name: 'name',
    origin: 'origin',
    hobby: 'hobby',
    summary: 'summary',
  },
  elements: {
    canvas: 'canvas',
    div: 'div',
    button: 'button',
    input: 'input',
    img: 'img',
    audio: 'audio',
    h1: 'h1',
    a: 'a',
    p: 'p',
  },
  fetch: {
    methods: {
      POST: 'POST',
    },
    headers: {
      props: {
        ContentType: 'Content-Type',
      },
      values: {
        applicationJson: 'application/json',
      },
    },
  },
  events: {
    click: 'click',
    keypress: 'keypress',
    resize: 'resize',
    DOMContentLoaded: 'DOMContentLoaded',
  },
  types: {
    boolean: {
      true: 'true',
      false: 'false',
    },
    string: 'string',
    object: 'object',
  },
  styleProps: {
    names: {
      display: 'display',
      pointerEvents: 'pointerEvents',
    },
    values: {
      none: 'none',
      block: 'block',
      visible: 'visible',
      hidden: 'hidden',
      auto: 'auto',
      flex: 'flex',
    },
  },
  charNames: {
    Gisapia: 'Gisapia',
    Hookin: 'Hookin',
    Reduxon: 'Reduxon',
  },
}

export const emailValidationReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const charNameList = ['Gisapia', 'Hookin', 'Reduxon']

export const chineseString =
  '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑'

export const animationSettings = {
  selectCharUI: {
    start: 'toBottomHide forwards 1s',
    end: 'fromBottomShow 2s forwards',
  },
  messenger: {
    start: 'fallFromTop 1s forwards',
    end: 'backToTheTop 2s forwards',
  },
}

export const messages = {
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
  withoutMail: {
    pl: ['Maila nie wysyłam,', 'dzięki za rozmowę 😉'],
    eng: [`I don't send the e-mail,`, `thanks for the interview! 😉`],
  },
  mailSent: {
    pl: [`Mail wysłany, sprawdź! 😋`],
    eng: [`Mail sent, check it! 😋`],
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
  sending: {
    pl: 'Już wysyłam! 😎',
    eng: "I'm sending! 😎",
  },
  oneMoreMoment: {
    pl: 'jeszcze naprawdę chwilkę! 😏',
    eng: 'one more moment! 😏',
  },
  secondMoreMoment: {
    pl: 'już, już, prawie! 😎',
    eng: 'already, already, almost!! 😎',
  },
}

export const commands = {
  chooseCharacter: {
    pl: 'Wybierz swojego rozmówcę',
    eng: 'Choose a character to talk!',
  },
  startTalking: {
    pl: 'Porozmawiaj',
    eng: 'Start talking',
  },
  talkAgain: {
    pl: 'Porozmawiaj ponownie',
    eng: 'Talk again',
  },
  send: {
    pl: 'Wyślij',
    eng: 'Send',
  },
}

export const alerts = {
  mustWritingSomething: {
    pl: 'Musisz coś napisać',
    eng: 'You must writing something',
  },
  correctMailFormat: {
    pl: 'Podaj właściwy format maila',
    eng: 'Write the correct mail format',
  },
}

export const classNames = {
  messenger: {
    main: 'messenger',
    inner: 'messenger-inner',
    screen: 'messenger-screen',
    screenInner: 'messenger-screen-inner',
    messageContainer: 'messenger-message-container',
    message: 'messenger-message',
    avatar: 'messenger-avatar',
    loaderContainer: 'messenger-loader-container',
    loader: 'messenger-loader',
    interface: 'messenger-interface',
    interfaceInput: 'messenger-interface-input',
    interfaceBtn: 'messenger-interface-btn',
    backIcon: 'messenger-backIcon',
    spinnerContainer: 'messenger-spinner-container',
    spinner: 'messenger-spinner',
  },

  selectCharUI: {
    main: 'selectCharUI',
    headline: 'selectCharUI-headline',
    messageContainer: 'selectCharUI-message-container',
    message: 'selectCharUI-message',
    startBtn: 'selectCharUI-startBtn',
    selectBtn: 'selectCharUI-selectBtn',
    selectBtnActive: 'selectCharUI-selectBtn-active',
    startBtnReady: 'selectCharUI-startBtn-ready',
    plLngBtn: 'selectCharUI-plLngBtn',
    engLngBtn: 'selectCharUI-engLngBtn',
    lngBtnActive: 'selectCharUI-lngBtn-active',
  },

  privatePolicy: {
    main: 'privatePolicy',
    linkContainer: 'privatePolicy-link-container',
    link: 'privatePolicy-link',
    headline: 'privatePolicy-headline',
    paragraph: 'privatePolicy-paragraph',
  },
}

export const classReferences = {
  messenger: {
    main: '.messenger',
    inner: '.messenger-inner',
    screen: '.messenger-screen',
    screenInner: '.messenger-screen-inner',
    messageContainer: '.messenger-message-container',
    message: '.messenger-message',
    avatar: '.messenger-avatar',
    loaderContainer: '.messenger-loader-container',
    loader: '.messenger-loader',
    interface: '.messenger-interface',
    interfaceInput: '.messenger-interface-input',
    interfaceBtn: '.messenger-interface-btn',
    backIcon: '.messenger-backIcon',
    spinnerContainer: '.messenger-spinner-container',
    spinner: '.messenger-spinner',
  },

  selectCharUI: {
    main: '.selectCharUI',
    headline: '.selectCharUI-headline',
    messageContainer: 'selectCharUI-message-container',
    message: '.selectCharUI-message',
    startBtn: '.selectCharUI-startBtn',
    selectBtn: '.selectCharUI-selectBtn',
    selectBtnActive: '.selectCharUI-selectBtn-active',
    startBtnReady: '.selectCharUI-startBtn-ready',
    plLngBtn: '.selectCharUI-plLngBtn',
    engLngBtn: '.selectCharUI-engLngBtn',
    lngBtnActive: '.selectCharUI-lngBtn-active',
  },

  privatePolicy: {
    main: '.privatePolicy',
    linkContainer: '.privatePolicy-link-container',
    link: '.privatePolicy-link',
    headline: '.privatePolicy-headline',
    paragraph: '.privatePolicy-paragraph',
  },
}

export const ideReferences = {
  gisapia: {
    lips: '#lips',
    rightHand: '#right-hand',
    hair: '#hair',
    eyes: '#eyes',
    main: '#gisapia',
  },
}

export const src = {
  audio: {
    typing: '/audio/typing.mp3',
    chatBubble: '/audio/chatBubble.mp3',
    throw: '/audio/throw.mp3',
    background: '/audio/background.mp3',
    finish: '/audio/finish.mp3',
    click: '/audio/click.mp3',
  },
  characters: {
    gisapia: {
      avatar: '/images/characters/gisapia/avatar.jpg',
    },
    hookin: {
      avatar: '/images/characters/hookin/avatar.jpg',
    },
    reduxon: {
      avatar: '/images/characters/reduxon/avatar.jpg',
    },
  },
  messenger: {
    backIcon: '/images/icons/back.svg',
  },
  privatePolicy: {
    site: '/privatePolicy.html',
  },
  selectCharUI: {
    plIcon: `/images/icons/pl.svg`,
    engIcon: `/images/icons/eng.svg`,
  },
}

export const mailEndPoint = 'https://dirt-ten-risk.glitch.me/api/mail/gisapia'
