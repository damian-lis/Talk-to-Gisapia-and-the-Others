export const charNames = {
  Gisapia: 'Gisapia',
  Hookin: 'Hookin',
  Reduxon: 'Reduxon',
}

export const charNameList = [
  charNames.Gisapia,
  charNames.Hookin,
  charNames.Reduxon,
]

export const categories = {
  name: 'name',
  origin: 'origin',
  hobby: 'hobby',
  summary: 'summary',
}

export const answerTypes = {
  isInMemory: 'isInMemory',
  isNotInMemory: 'isNotInMemory',
  isAddedToMemory: 'isAddedToMemory',
}

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
    message: 'selectCharUI-message',
    message: 'selectCharUI-message',
    startBtn: 'selectCharUI-startBtn',
    selectBtn: 'selectCharUI-selectBtn',
    activeBtn: 'selectCharUI-activeBtn',
    readyBtn: 'selectCharUI-readyBtn',
    languageIcon: 'selectCharUI-languageIcon',
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
    message: '.selectCharUI-message',
    message: '.selectCharUI-message',
    startBtn: '.selectCharUI-startBtn',
    selectBtn: '.selectCharUI-selectBtn',
    activeBtn: '.selectCharUI-activeBtn',
    readyBtn: '.selectCharUI-readyBtn',
    languageIcon: '.selectCharUI-languageIcon',
  },

  privatePolicy: {
    main: '.privatePolicy',
    linkContainer: '.privatePolicy-link-container',
    link: '.privatePolicy-link',
    headline: '.privatePolicy-headline',
    paragraph: '.privatePolicy-paragraph',
  },
}

export const messages = 'messages'
export const answers = 'answers'
export const noConnectionMessage = {
  pl: [
    `Maila niestety nie otrzymasz bo nie ma połączenia z serwerem... 😕`,
    `Idę to sprawdzić... Tymczasem dzięki za rozmowę! 😉`,
  ],
  eng: [
    `Unfortunately you will not receive e-mail because there is no connection to the server ...`,
    `I'm going to check it out ... In the meantime, thanks for the interview! 😉`,
  ],
}

export const withoutMailMessage = {
  pl: ['Maila nie wysyłam,', 'dzięki za rozmowę 😉'],
  eng: [`I don't send the e-mail,`, `thanks for the interview! 😉`],
}

export const chooseCharacter = {
  pl: 'Wybierz swojego rozmówcę',
  eng: 'Choose a character to talk!',
}

export const startTalking = {
  pl: 'Porozmawiaj',
  eng: 'Start talking',
}

export const talkAgain = {
  pl: 'Porozmawiaj ponownie',
  eng: 'Talk again',
}

export const privatePolicy = {
  pl: 'Polityka prywatności',
  eng: 'Private policy',
}

export const send = {
  pl: 'Wyślij',
  eng: 'Send',
}

export const mustWritingSomething = {
  pl: 'Musisz coś napisać',
  eng: 'You must writing something',
}

export const correctMailFormat = {
  pl: 'Podaj właściwy format maila',
  eng: 'Write the correct mail format',
}

export const sending = {
  pl: 'Już wysyłam! 😎',
  eng: "I'm sending! 😎",
}

export const oneMoreMoment = {
  pl: 'jeszcze naprawdę chwilkę! 😏',
  eng: 'one more moment! 😏',
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
      avatar: '/images/gisapia/avatar.jpg',
    },
    hookin: {
      avatar: '/images/hookin/avatar.jpg',
    },
    reduxon: {
      avatar: '/images/reduxon/avatar.jpg',
    },
  },
  messenger: {
    backIcon: '/images/icons/back.svg',
  },
  privatePolicy: {
    site: '/privatePolicy.html',
  },
}

export const mailEndPoint = 'https://dirt-ten-risk.glitch.me/api/mail/gisapia'
