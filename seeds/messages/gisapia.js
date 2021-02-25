import categories from '../categories.js'

export default {
  [categories[0]]: {
    messages: [
      'Cześć!',
      // 'Nazywam się Gisapia',
      // 'Powiedz mi proszę jak mogę się do Ciebie zwracać?',
    ],
    answers: {
      isInMemory: [
        'Tak, kojarzę takie imię jak',
        // 'Miałam dwóch znajomych, którzy tak się nazywali.',
        // 'Niestety  zadnym z nich nie utrzymuje juz kontaktu...',
      ],
      isNotInMemory: [
        'Niestety nie kojarzę takiego imienia',
        'Napisz je proszę jeszcze raz, a zapamiętam!',
      ],
      addedToMemory: ['Ale super! Ciesze się, ze poznałam nowe imię'],
    },
  },
  [categories[1]]: {
    messages: ['Skąd w ogóle jesteś jezeli mogę wiedzieć?'],
    answers: {
      isInMemory: ['to piękna miejscowość', 'Bla bla'],
      isNotInMemory: [
        'Niestety nie kojarzę takiego miejsca',
        'Napisz je proszę jeszcze raz, a zapamiętam!',
      ],
      addedToMemory: [
        'to pewnie ciekawa miejscowość. Od razu po naszej rozmowie idę wygooglować',
      ],
    },
  },

  [categories[categories.length - 1]]: {
    messages: [
      'Okej to co udało mi się zapamiętać odnośnie Ciebie',
      'Masz na imię ',
      'Pochodzisz z ',
      'Ciesze się, ze mogłam Cię poznać!',
      'Niestety ze względu na inne obowiazki muszę zmykać...',
      'Do zobaczenia następnym razem! :)',
    ],
  },
}
