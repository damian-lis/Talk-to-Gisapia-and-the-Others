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
          'myślę, że uda nam się znaleźć płaszczyznę porozumienia',
        ],
        [
          'jak mnie pamięć nie myli, w mojej rodzinie jest osoba, która ma na imię -userName- 🙂',
          'teraz sobie bardzo dobrze radzi, a zatrudnienie ma w translatorze googla jako jeden z czołowych algorytmów 😲',
        ],
      ],
      isNotInMemory: [
        [
          'mój zasób pamięci niestety nie obejmuje takiego imienia 😟',
          'napisz proszę je proszę jeszcze raz bez dodatkowych znaków, a je trwale zapisze 🧐',
        ],
        [
          'nieraz człowiek nie jest nieomylny... Niestety nie kojarzę takiego imienia 😟',
          'napisz proszę je jeszcze raz bez dodatkowych znaków, a je trwale zapisze 🧐',
        ],
      ],
      isAddedToMemory: [
        [
          'okej, zapisuje -userName- 🙂',
          'Twoje imię ma bardzo ładny wydźwięk',
          'takie bardzo szlacheckie 😲',
        ],
        [
          'dziękuję Ci, że nauczyłem się nowego imienia -userName- 🙂',
          'postaram się tak zwracać do Ciebie podczas reszty konwersacji',
        ],
      ],
    },
  },

  origin: {
    messages: [
      [
        'zanim przejdzeimy dalej może trochę o mojej osobie',
        'pochodzę ze świata gdzie wszystko jest zapisane w jakimś ciągu z 0 i 1 😎',
        'praktycznie same bramki logiczne, algorytmy itd., ale to jest akurat piękno naszego świata! 😏',
        'można się przyzwyczaić z czasem do tego',
        'a Ty -userName- skąd jesteś? 🧐',
      ],
    ],
    answers: {
      isInMemory: [
        [
          '-userOrigin- to bardzo stare miejsce',
          'różne historie czytałem odnośnie tej miejscowości',
          'może kiedyś tam się jeszcze wybiore poprzez naszego wujka googla 😎',
          'hmmm... może jutro? Ehh, to nie istotne teraz...',
        ],
        [
          'kiedyś w miejscowości -userOrigin- było jedno z najszybszych połączeń internetowych na świecie',
          'teraz już niestety nikt o tym nie pamięta...',
          'nawet w internecie niewiele już informacji zostało 😒',
          'naprawdę ciekawe miejsce...',
        ],
      ],
      isNotInMemory: [
        [
          'niestety -userName- nie kojarzę takiego miejsca 😒',
          'napisz proszę samą miejscowość bez dodatkowych znaków to ją zachowam w pamięci',
        ],
      ],
      isAddedToMemory: [
        [
          'bardzo lubię uczyć się czegoś nowego 🙂',
          'miejscowość -userOrigin- wydaje się być sporą miejscowością',
          'nasz wujek google podpowiada mi, że macie tam ciekawe średniowieczne ruiny 🧐',
          'gdybym był tylko człowiekiem... Mógłbym tam pójść i osobiście to zwiedzić...',
          'no nic, rozmarzyłem się... 😒',
          'wracamy do rozmowy 🙂',
        ],
        [
          `nasz wujek google pokazuje mi, że w miejscowości -userOrigin- macie piękne budynki i uliczki...`,
          'Taki widok to symfonia dla duszy... 🙂',
          'Ile bym dał żeby móc osobiście to wszystko zobaczyć jak Wy... Ludzie... 😒',
          'no nic, nie ma co wybiegać wyobraźnią...',
        ],
      ],
    },
  },
  hobby: {
    messages: [
      [
        '-userName- każdy z nas ma jakies swoje ulubione zajęcia',
        'ja np bardzo lubię przeglądać nowo dodane materiały do wikipedii 🧐',
        'a jakie jest Twoje hobby?',
      ],
      [
        'często jak rozmawiam z ludźmi to aż nie chce mi się wierzyć ile macie ciekawych zajęć!',
        'np. do moich takich ulubionych należy pentesting, czyli sprawdzanie zabezpieczeń firm i ich modyfikacja 😎',
        'mam takiego kumpla Nortona, z którym wieczorami się przy tym relaksujemy 😀',
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
          'ale już chyba z tego wyrosłem i robię już inne rzeczy 😉',
        ],
      ],
      isNotInMemory: [
        [
          'no niestety -userName-, nie kojarzę takiego hobby... 😒',
          'napisz je jeszcze raz bez dodatkowych znaków, a zachowam je w pamięci',
        ],
      ],
      isAddedToMemory: [
        [
          'super, -userHobby- dodałem do mojej pamięci 😎',
          'tak czytam i czytam i powiem Ci, że sam bym się tym zainteresował 🧐 ',
          'bardzo ciekawe zajęcie np. na wieczory 😏',
          'jutro będę miał trochę więcej czasu to może spróbuję!',
        ],
        [
          'zaraz się dowiem od wujka google co to jest -userHobby- 🧐',
          'więc tak',
          '-userHobby- to zajęcie, które odstresowuje i pozwala rozwijać wyobraźnię',
          'ogólnie bardzo fajny sposób na spędzane czasu z rodziną',
          'ehh...',
          'zainteresuje się tym jak sam jakąś już załozę 😔',
        ],
      ],
    },
  },
  summary: {
    messages: [
      [
        '-userName- ze względu na brak czasu muszę tutaj zakończyć naszą konwersację',
        'to co udało mi się zapamiętać odnośnie Twojej osoby 🧐',
        `Twoje imię to -userName-,`,
        'bardzo szlacheckie! 😎',
        `Twoja miejscowość, z której pochodzisz to -userOrigin-`,
        `hobby, którym się interesujesz to -userHobby-`,
        'ciesze się i dziękuję, że mogłem Cię poznać! 🙂',
        'niestety ze względu na inne obowiazki muszę odejść...',
        'jeżeli chcesz abym wysłał Twoje odpowiedzi na maila to podaj mi go proszę w czystej postaci, a ja niezwłocznie to uczynię 😎',
        'jeśli nie, to napisz cokolwiek, a zakończymy rozmowę! 🙂',
      ],
    ],
  },
}
