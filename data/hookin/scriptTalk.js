export default {
  name: {
    messages: [
      [
        'Witam',
        `mówią na mnie Hookin 🧐`,
        `z kim będę miał przyjemność rozmawiać?`,
        'jak Ci na imię? 🙂',
      ],
      [
        'Witaj Nieznajomy 🧐',
        'w kręgu, w którym się obracam, mówią na mnie Hookin',
        'a Tobie jak na imię? 🙂',
      ],
    ],
    answers: {
      isInMemory: [
        [
          '-userName- to szlacheckie imię 🙂',
          'myślę, ze uda nam się znaleźć płaszczyznę porozumienia',
        ],
        [
          'jak mnie pamięć nie myli, w mojej rodzinie jest osoba, która ma na imię -userName- 🙂',
          'teraz sobie bardzo dobrze radzi, a zatrudnienie ma w translatorze googla jako jeden z czołowych algorytmów 😲',
        ],
      ],
      isNotInMemory: [
        [
          'mój zasób pamięci niestety nie obejmuje takich imion 😟',
          'napisz proszę jeszcze raz samo imię, a je trwale zapisze 🧐',
        ],
        [
          'nieraz człowiek nie jest nieomylny, niestety nie kojarzę takiego imienia 😟',
          'napisz je proszę jeszcze raz, a je zapamiętam 🧐',
        ],
      ],
      isAddedToMemory: [
        [
          'okej, zapisuje -userName- 🙂',
          'Twoje imię ma bardzo ładny wydźwięk',
          'takie bardzo szlacheckie 😲',
        ],
        [
          'dziękuję Ci, ze nauczyłem się nowego imienia -userName- 🙂',
          'postaram się tak zwracać do Ciebie podczas reszty konwersacji',
        ],
      ],
    },
  },

  origin: {
    messages: [
      [
        'zanim przejdzeimy dalej moze trochę o mojej osobie',
        'pochodzę ze świata gdzie wszystko jest zapisane w jakimś ciągu z 1 i 0 😎',
        'praktycznie same bramki logiczne, ale to jest akurat piękno naszego świata! 😏',
        'mozna się przyzwyczaić z czasem do tego',
        'a Ty -userName- skąd jesteś? 🧐',
      ],
    ],
    answers: {
      isInMemory: [
        [
          '-userOrigin- to bardzo stare miejsce',
          'rózne historie czytałem odnośnie tej miejscowości',
          'moze kiedyś tam się jeszcze wybiore poprzez naszego wujka googla 😎',
          'hmmm... moze jutro? Ehh, to nie istotne teraz...',
        ],
        [
          'kiedyś w miejscowości -userOrigin- było jedno z najszybszych połączeń internetowych na świecie',
          'teraz juz niestety nikt o tym nie pamięta...',
          'nawet w internecie niewiele juz informacji zostało 😒',
          'naprawdę ciekawe miejsce...',
        ],
      ],
      isNotInMemory: [
        [
          'Niestety -userName- nie kojarzę takiego miejsca 😒',
          'Napisz proszę samą miejscowość to ją zachowam w pamięci',
        ],
      ],
      isAddedToMemory: [
        [
          'Bardzo lubię uczyć się czegoś nowego 🙂',
          '-userOrigin- wydaje się być sporą miejscowością',
          'nasz wujek google podpowiada mi, ze macie tam ciekawe średniowieczne ruiny 🧐',
          'gdybym był tylko człowiekiem... Mógłbym tam pójść i osobiście to zwiedzić...',
          'no nic, rozmarzyłem się... 😒',
          'wracamy do rozmowy -userName- 🙂',
        ],
        [
          `nasz wujek google pokazuje, ze w miejscowości -userOrigin- macie piękne budynki, uliczki...`,
          'Taki widok to symfonia dla duszy... 🙂',
          'Ile bym dał zeby móc osobiście to wszystko zobaczyć jak Wy... Ludzie... 😒',
          'no nic, nie ma co wybiegać wyobraźnią...',
        ],
      ],
    },
  },
  hobby: {
    messages: [
      [
        '-userName- kazdy z nas ma jakies swoje ulubione zajęcia',
        'ja np bardzo lubię przeglądać nowo dodane materiały do wikipedii 😏',
        'jakie jest Twoje hobby?',
      ],
      [
        'często jak rozmawiam z ludźmi to az nie chce mi się wierzyć ile macie ciekawych zajęć!',
        'np. do moich takich ulubionych nalezy pentesting, czyli sprawdzanie zabezpieczeń firm i ich modyfikacja 😎',
        'a co Ty -userName- lubisz robić na codzień?',
        'jakie masz hobby 🙂?',
      ],
    ],
    answers: {
      isInMemory: [
        [
          'a to kojarzę! 🙂',
          '-userHobby- jest ulubionym zajęciem mojego kumpla Messengera',
          'ale nie będę się rozgadywać bo szkoda czasu!',
        ],
        [
          '-userHobby- to naprawdę ciekawe zajęcie! 🙂',
          'sam kiedyś trochę się tym zajmowałem',
          'ale juz chyba z tego wyrosłem i robię juz inne rzeczy 😉',
        ],
      ],
      isNotInMemory: [
        [
          'no niestety -userName-, nie kojarzę takiego hobby... 😒',
          'napisz je jeszcze raz, a zachowam je w pamięci',
        ],
      ],
      isAddedToMemory: [
        [
          'dobrze, -userHobby- dodałem do pamięci 😎',
          'tak czytam i czytam i powiem Ci, ze sam bym się tym zainteresował 🧐 ',
          'bardzo ciekawe zajęcie np. na wieczory 😏',
          'jutro będę miał trochę więcej czasu to moze spróbuję!',
        ],
        [
          'Zaraz się dowiem od wujka google co to jest -userHobby- 🧐',
          'więc tak',
          '-userHobby- to zajęcie, które odstresowuje i pozwala rozwijać wyobraźnię',
          'ogólnie bardzo fajny sposób na spędzane czasu z rodziną',
          'ehh...',
          'zainteresuje się tym jak sam jakąś juz załozę 😔',
        ],
      ],
    },
  },
  summary: {
    messages: [
      [
        '-userName- ze względu na brak czasu muszę tutaj zakończyć naszą rozmowę',
        'to co udało mi się zapamiętać odnośnie Ciebie 🧐',
        `Twoje imię to -userName-,`,
        'bardzo szlacheckie! 😎',
        `Twoja miejscowość, z której pochodzisz to -userOrigin-`,
        `hobby, którym się interesujesz to -userHobby-`,
        'ciesze się i dziękuję, ze mogłem Cię poznać! 🙂',
        'niestety ze względu na inne obowiazki muszę odejść...',
        'jezeli chcesz abym wysłał Twoje odpowiedzi na maila to podaj mi go proszę, a ja niezwłocznie to uczynię 😎',
        'Jezeli nie chcesz to napisz cokolwiek a zakończymy rozmowę! 🙂',
      ],
    ],
  },
}
