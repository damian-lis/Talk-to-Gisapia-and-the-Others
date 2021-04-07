export default {
  name: {
    messages: [
      [
        'Siema! 😎',
        `jestem Reduxon!`,
        `zanim zaczniemy gadać musisz wiedzieć, ze jestem dosyć bezpośredni 😉`,
        'jak masz na imię?',
      ],
      ['Siema, siema! 😎', 'jestem Reduxon!', 'jak masz na imię?'],
    ],
    answers: {
      isInMemory: [
        [
          'heh, taka śmieszna sprawa bo ostatnio przyłozyłem osobie o imieniu -userName- 😅',
          'wiesz osoba chciała mnie zlagować i dostała prądem z laptopa... 😂',
          'nie popełnij tego błędu! 😋',
          'oczywiście ma się juz dobrze!',
        ],
        [
          'mówisz, ze -userName-?',
          'kojarzę takie imię, kiedyś wybiłem zęba osobie o takim imieniu 😅',
          'tzn. wirtualnego zęba, nie wazne... 😂',
          'ale u nas w świecie 0 i 1 jest to odczuwalne tak jak u was 😋',
        ],
      ],
      isNotInMemory: [
        [
          'o raczej nigdy takiego imienia nie widziałem',
          'napisz je jeszcze raz, a je zapamiętam i nauczę się czegoś nowego! 😎',
        ],
        [
          'hmmm...',
          'nic z tego... Nie mam tego imienia w pamięci 😞',
          'napisz je jeszcze raz, a je zapamiętam i nauczę się czegoś nowego! 😎',
        ],
      ],
      isAddedToMemory: [
        ['no i elegancko, -userName- wpadło do mojej czerwonej pamięci! 😎'],
        ['gitarunia, moje imiona zostały wzbogacone o -userName-, yeah! 😎'],
      ],
    },
  },

  origin: {
    messages: [
      [
        'a gdzie w ogóle mieszkasz? Jakieś miasto, wioska?',
        'wiesz, jezeli o mnie chodzi to mój świat to 0 i 1... 😉',
        'za duzo zieleni to tutaj nie ma... 😂',
      ],
      [
        'coś mi się lokalizacja po IP zawiesiła...',
        'dobra nie dam rady to zapytam',
        'skąd jesteś? Zawsze mogłem spradzić, ale teraz coś nawaliło... 😓',
        'bo ja to wiesz... 0 i 1... Nic specjalnego 😂',
      ],
    ],
    answers: {
      isInMemory: [
        [
          '-userOrigin- to stare dobre tereny',
          'kiedyś sobie tam w google maps chodziłem 😎',
          'fajny macie ten sklep obok tego wielkiego budynku 😉',
        ],
        [
          'fajna miejscówka ten -userOrigin-, taki Kazik tam mieszka',
          'ale nie będę Cię teraz -userName- tym zanudzał 😉',
        ],
      ],
      isNotInMemory: [
        [
          'nie kojarzę takiej miejscówki 😞',
          'podaj dokładnie miejscowość, z której jesteś, a ja ją zapamiętam! 😎',
        ],
      ],
      isAddedToMemory: [
        [
          'no ciekawe to miejsce',
          'czyli tak wygląda -userOrigin- w google maps',
          'no biedy nie ma 😉',
          'widzę -userName-, ze na tereny leśne tez nie narzekacie 😎',
        ],
        [
          'fajna miejscówka ten -userOrigin-',
          'gdybym mógł się tylko zmaterializować to bym jakąś panienkę tam poderwał... 😂',
        ],
      ],
    },
  },
  hobby: {
    messages: [
      [
        'teraz -userName- pytanie za sto punktów!',
        'co robisz w wolnym czasie?',
        'tzn. jakie masz hobby w tej swojej miejscowości -userOrigin-? 😏',
      ],
      [
        'przechodzimy -userName- do mojego ulubionego pytania!',
        'co ogólnie robisz po pracy?',
        'w sensie jakie masz hobby w tej swojej miejscowości -userOrigin-? 😏',
      ],
    ],
    answers: {
      isInMemory: [
        [
          '-userHobby- to jest to!',
          'często oglądam na youtube filmiki o tym',
          'powiem Ci, ze to mega ciekawe zajęcie 😎',
        ],
        [
          'tez się tym interesujesz -userName-?',
          '-userHobby- to moje hobby od dziecka',
          'tzn. od pierwszych linijek kodu... 😁',
        ],
      ],
      isNotInMemory: [
        [
          'no patrz, taki ze mnie mądrala, a tego hobby nie znam...',
          'napisz mi po prostu jak Twoje ulubione zajęcie się nazywa, a ja je zapamiętam! 😎',
        ],
      ],
      isAddedToMemory: [
        [
          '-userHobby-, no zobaczmy',
          'piszą, ze to hobby bardziej dla spokojnych osób...',
          'czyli raczej nie dla mnie 😅',
          'ale ogólnie spoko zajęcie na zabicie czasu! 😉',
        ],
        [
          '-userHobby- brzmi mega ciekawie i trochę tak niebezpiecznie! 😈',
          'tak czytam i widzę, ze polubił bym te klimaty! 😎',
        ],
      ],
    },
  },
  summary: {
    messages: [
      [
        '-userName- ze względu na brak czasu muszę tutaj zakończyć 😔',
        'zeby nie było, coś tam udało mi się zapamiętać podczas dzisiejszej rozmowy 😀',
        `więc tak, Twoje imię to -userName-,`,
        `mieszkasz sobie w -userOrigin-,`,
        `a Twoje hobby to -userHobby-`,
        'fajnie było Cię  poznać! 😎',
        'jezeli chcesz abym wysłał Twoje odpowiedzi na maila to podaj mi go w czystej postaci 😊',
        'jezeli nie chcesz to napisz cokolwiek i się moze kiedyś jeszcze zobaczymy! 😉',
      ],
    ],
  },
}
