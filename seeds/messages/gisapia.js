export default {
  introduce: {
    messages: [
      'Cześć!',
      // 'Nazywam się Gisapia',
      // 'Naprawdę miło Cię poznać drogi Internauto!',
      // 'Powiedz mi proszę jak mogę się do Ciebie zwracać?',
    ],
    answers: {
      isInMemory: [
        'Tak, kojarzę takie imię',
        'Miałam dwóch znajomych, którzy tak się nazywali.',
        'Niestety  zadnym z nich nie utrzymuje juz kontaktu...',
      ],
      isNotInMemory: [
        'Niestety nie kojarzę takiego imienia',
        'Napisz je proszę jeszcze raz, a zapamiętam!',
      ],
      addedToMemory: ['Ale się cieszę! Poznałam nowe słowo!'],
    },
  },
  origin: {
    messages: ['Skąd w ogóle jesteś jezeli mogę wiedzieć?'],
    answers: {
      isInMemory: ['Tak, kojarzę takie imię'],
      isNotInMemory: [
        'Niestety nie kojarzę takiego imienia',
        'Napisz je proszę jeszcze raz, a zapamiętam!',
      ],
    },
  },
}
