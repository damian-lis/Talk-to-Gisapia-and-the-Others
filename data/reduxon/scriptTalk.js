import { charNames, answerVariants, categories } from '../globalNames.js'

export default {
  [categories.name]: {
    messages: [
      ['Cześć!', 'Hej!', 'Witaj!'],
      `Nazywam się ${charNames.reduxon}`,
      [
        'Powiedz mi proszę jak mogę się do Ciebie zwracać?',
        'Jakis kolejny tekst',
        'kolejny tekst',
      ],
    ],
    answers: {
      [answerVariants.isInMemory]: [
        [
          'Tak, kojarzę takie imię jak',
          'Po naszej rozmowię wygoogluje sobie etymologię słowa',
        ],
        `Miałam dwóch znajomych, którzy tak się nazywali.`,
        `Niestety  zadnym z nich nie utrzymuje juz kontaktu...`,
      ],
      [answerVariants.isNotInMemory]: [
        'Niestety nie kojarzę takiego imienia',
        [
          'Napisz je proszę jeszcze raz, a zapamiętam!',
          'Ej napiszesz proszę jeszcze raz to imię?',
        ],
      ],
      [answerVariants.addedToMemory]: [
        [
          'Ale super! Ciesze się, ze poznałam nowe imię',
          'Moja pamięć jest bogatsza o imię',
        ],
      ],
    },
  },

  [categories.origin]: {
    messages: [
      [
        'Tak w ogóle to skąd jesteś?',
        'Skąd w ogóle jesteś jezeli mogę wiedzieć?',
      ],
    ],
    answers: {
      [answerVariants.isInMemory]: ['to piękna miejscowość', 'Bla bla'],
      [answerVariants.isNotInMemory]: [
        'Niestety nie kojarzę takiego miejsca',
        'Napisz je proszę jeszcze raz, a zapamiętam!',
      ],
      [answerVariants.addedToMemory]: [
        'to pewnie ciekawa miejscowość. Od razu po naszej rozmowie idę wygooglować',
      ],
    },
  },
  [categories.hobby]: {
    messages: ['Powiedz mi jakie masz hobby?'],
    answers: {
      [answerVariants.isInMemory]: [
        'znam to zajęcie jak własną kieszeń!',
        'Bla bla',
      ],
      [answerVariants.isNotInMemory]: [
        'Hmmm ciekawe... Nie kojarzę takiego hobby.',
        'Mozesz jeszcze raz je napisać to zapamiętam?',
      ],
      [answerVariants.addedToMemory]: [
        'wlicza się do ekstremalnych sportów, czy coś mylę? :)',
        'Nie wazne poczytam napewno!',
      ],
    },
  },
  [categories.summary]: {
    messages: [
      'Okej to co udało mi się zapamiętać odnośnie Ciebie',
      'Masz na imię ',
      'Pochodzisz z ',
      'Twoje hobby to ',
      'Ciesze się, ze mogłam Cię poznać!',
      'Niestety ze względu na inne obowiazki muszę zmykać...',
      'Jezeli chcesz aby Twoje odpowiedzi trafiły do mojej pamięci na zawsze to napisz proszę "zapisz" :)',
      'Jezeli nie chcesz to napisz cokolwiek a sobie pójdę :)!',
    ],
  },
}
