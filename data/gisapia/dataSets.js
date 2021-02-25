export default [
  {
    category: 'name',
    messages: [
      'Cześć!',
      'Nazywam się Gisapia',
      'Powiedz mi proszę jak mogę się do Ciebie zwracać?',
    ],
    answers: {
      isInMemory: [
        'Tak, kojarzę takie imię jak',
        'Miałam dwóch znajomych, którzy tak się nazywali.',
        'Niestety  zadnym z nich nie utrzymuje juz kontaktu...',
      ],
      isNotInMemory: [
        'Niestety nie kojarzę takiego imienia',
        'Napisz je proszę jeszcze raz, a zapamiętam!',
      ],
      addedToMemory: ['Ale super! Ciesze się, ze poznałam nowe imię'],
    },
  },
  {
    category: 'origin',
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

  {
    category: 'summary',
    messages: [
      'Okej to co udało mi się zapamiętać odnośnie Ciebie',
      'Masz na imię ',
      'Pochodzisz z ',
      'Ciesze się, ze mogłam Cię poznać!',
      'Niestety ze względu na inne obowiazki muszę zmykać...',
      'Jezeli chcesz aby Twoje odpowiedzi trafiły do mojej pamięci na zawsze to napisz proszę "zapisz" :)',
      'Jezeli nie chcesz to napisz cokolwiek a sobie pójdę :)!',
    ],
  },
]
