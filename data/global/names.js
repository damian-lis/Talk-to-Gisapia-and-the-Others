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
    screenContainer: 'messenger-screen-container',
    screen: 'messenger-screen',
    messageContainer: 'messenger-message-container',
    message: 'messenger-message',
    characterAvatar: 'messenger-character-avatar',
    loaderContainer: 'messenger-loader-container',
    loader: 'messenger-loader',
    interfaceContainer: 'messenger-interface-container',
    interfaceInput: 'messenger-interface-input',
    interfaceBtn: 'messenger-interface-btn',
  },

  selectCharUI: {
    main: 'selectCharUI',
    headline: 'selectCharUI-headline',
    message: 'selectCharUI-message',
    message: 'selectCharUI-message',
    startBtn: 'selectCharUI-startBtn',
    selectBtn: 'selectCharUI-selectBtn',
    activeBtn: 'selectCharUI-activeBtn',
  },
}

export const classReferences = {
  messenger: {
    main: '.messenger',
    inner: '.messenger-inner',
    screenContainer: '.messenger-screen-container',
    screen: '.messenger-screen',
    messageContainer: '.messenger-message-container',
    message: '.messenger-message',
    characterAvatar: '.messenger-character-avatar',
    loaderContainer: '.messenger-loader-container',
    loader: '.messenger-loader',
    interfaceContainer: '.messenger-interface-container',
    interfaceInput: '.messenger-interface-input',
    interfaceBtn: '.messenger-interface-btn',
  },

  selectCharUI: {
    main: '.selectCharUI',
    headline: '.selectCharUI-headline',
    message: '.selectCharUI-message',
    message: '.selectCharUI-message',
    startBtn: '.selectCharUI-startBtn',
    selectBtn: '.selectCharUI-selectBtn',
    activeBtn: '.selectCharUI-activeBtn',
  },
}

export const messages = 'messages'
export const answers = 'answers'
export const noConnectionMessage = [
  `Maila niestety nie otrzymasz bo nie ma połączenia z serwerem... 😕`,
  `Idę to sprawdzić... Tymczasem dzięki za rozmowę! 😉`,
]
export const withoutMailMessage = [
  'Maila nie wysyłam,',
  'dzięki za rozmowę',
  '😉',
]

export const mailEndPoint = 'http://localhost:5000/api/mail'