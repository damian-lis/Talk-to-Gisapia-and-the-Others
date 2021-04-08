export default {
  name: {
    messages: [
      [
        'Siema! 😎',
        `jestem Reduxon!`,
        `zanim zaczniemy rozmawiać musisz wiedzieć, że jestem dosyć bezpośredni 😉`,
        'jak masz na imię?',
      ],
      ['Siema, siema! 😎', 'jestem Reduxon!', 'jak masz na imię?'],
    ],
    answers: {
      isInMemory: [
        [
          'heh, taka śmieszna sprawa bo ostatnio przyłożyłem osobie o imieniu -userName- 😅',
          'wiesz chciała mnie zlagować i dostała prądem z laptopa... 😂',
          'nie popełnij tego błędu! 😋',
          'oczywiście ma się juz dobrze!',
        ],
        [
          'mówisz, że -userName-?',
          'kojarzę takie imię, kiedyś wybiłem zęba osobie, która tak się nazywała 😅',
          'tzn. wirtualnego zęba...',
          'yy... nie ważne... 😂',
          'w świecie 0 i 1 ból jest tak samo odczuwalny jak u was 😈',
        ],
      ],

      isNotInMemory: [
        [
          'nigdy takiego imienia nie widziałem',
          'napisz je jeszcze raz bez dodatkowych znaków, a je zapamiętam i nauczę się czegoś nowego! 😎',
        ],
        [
          'hmmm...',
          'nic z tego... Nie mam tego imienia w pamięci 😞',
          'napisz je jeszcze raz bez dodatkowych znaków, a je zapamiętam i nauczę się czegoś nowego! 😎',
        ],
      ],
      isAddedToMemory: [
        ['no i elegancko, -userName- wpadło do mojej czerwonej pamięci! 😈'],
        [
          'gitarunia, moje pamięć została wzbogacona o imię -userName-, yeah! 😈',
        ],
      ],
    },
  },
  //
  origin: {
    messages: [
      [
        'a gdzie w ogóle mieszkasz? Jakieś miasto, wioska?',
        'wiesz, jeżeli o mnie chodzi to mój świat to 0 i 1... 😉',
        'za dużo zieleni to tutaj nie ma... 😂',
      ],
      [
        'coś mi się lokalizacja po IP zawiesiła...',
        'dobra... nie dam rady... muszę Cię zapytać...',
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
          'fajna miejscówka ten -userOrigin-, taki kumpel Apachi tam mieszka',
          'ale nie będę Cię teraz -userName- tym zanudzał 😉',
        ],
      ],
      isNotInMemory: [
        [
          'nie kojarzę takiej miejscówki 😞',
          'podaj dokładnie miejscowość bez dodatkowych znaków, a ja ją zapamiętam! 😎',
        ],
      ],
      isAddedToMemory: [
        [
          'no ciekawe to miejsce',
          'czyli tak wygląda -userOrigin- w google maps',
          'no biedy nie ma 😉',
          'widzę -userName-, ze na tereny leśne też nie narzekacie 😎',
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
        'ok, przechodzimy -userName- do mojego ulubionego pytania!',
        'co ogólnie robisz po pracy?',
        'w sensie jakie masz hobby w tej swojej miejscowości -userOrigin-? 😏',
      ],
    ],
    answers: {
      isInMemory: [
        [
          '-userHobby- to jest to!',
          'często oglądam na youtube filmiki o tym',
          'powiem Ci, że to mega ciekawe zajęcie 😎',
        ],
        [
          'też się tym interesujesz -userName-?',
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
          'piszą, że to hobby bardziej dla spokojnych osób...',
          'czyli raczej nie dla mnie 😅',
          'ale ogólnie spoko zajęcie na zabicie czasu! 😉',
          'ja natomiast uwielbiam oglądać te wasze kotki i pieski z moim kumplem Youtube 🙃',
          'w świecie 0 i 1 mamy podobne zwierzątka, które nazywają się bugi i errory',
          'ale bardziej denerwują niż bawią... 😅',
        ],
        [
          '-userHobby- brzmi mega ciekawie i trochę tak niebezpiecznie! 😈',
          'tak czytam i widzę, że polubił bym te klimaty! 😎',
          'ja natomiast uwielbiam oglądać te wasze kotki i pieski z moim kumplem Youtube 🙃',
          'w świecie 0 i 1 mamy podobne zwierzątka, które nazywają się bugi i errory',
          'ale bardziej denerwują niż bawią... 😅',
        ],
      ],
    },
  },
  summary: {
    messages: [
      [
        '-userName- ze względu na brak czasu muszę tutaj zakończyć 😔',
        'żeby nie było, coś tam udało mi się zapamiętać podczas dzisiejszej rozmowy 😀',
        `więc tak, Twoje imię to -userName-,`,
        `mieszkasz sobie w -userOrigin-,`,
        `a Twoje hobby to -userHobby-`,
        'fajnie było Cię  poznać! 😎',
        'jeżeli chcesz abym wysłał Twoje odpowiedzi na maila to podaj mi go w czystej postaci 😊',
        'jeśli nie to napisz cokolwiek, a ja się zawinę! 😉',
      ],
    ],
  },
}
