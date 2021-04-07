export default {
  name: {
    messages: [
      [
        'Cześć 😊',
        `nazywam się Gisapia`,
        `bardzo mi miło, ze będę mogła z Tobą porozmawiać! 😎`,
        'powiedz mi proszę jak Ci na imię nieznajomy?',
      ],
      [
        'Cześć, cześć! 😊',
        'w internecie mówią na mnie Gisapia',
        'A Ty jak masz na imię? 😎',
      ],
    ],
    answers: {
      isInMemory: [
        [
          `-userName-? Naprawdę -userName-??? Mój kumpel ma tak na imię! 😋`,
          `ostatnio się pokłócilismy 😐, ale to raczej chwilowe! 😉`,
          'dobra, nie było tematu bo się rozgadam!',
        ],
        [
          '2 lata temu rozmawiałam z chłopakiem, który miał na imię -userName-',
          'bardzo fajny...',
          'i przystojny chłopak 😏',
          'ale juz niestety się nie odezwał... 😓',
        ],
      ],
      isNotInMemory: [
        [
          'kurcze.. Szukam i szukam i nie mogę skojarzyć... 😞',
          'jak napiszesz jeszcze raz swoje imię to dodam je do pamięci i będę się tak do Ciebie potem zwracać 😊',
        ],
        [
          'wiesz co trochę imion się przewinęło przez moją pamięć, ale tego imienia nie umiem znaleźć... 😞',
          'jak napiszesz je jeszcze raz to dodam je do pamięci i będę się tak do Ciebie potem zwracać 😊',
        ],
      ],
      isAddedToMemory: [
        [
          'czekaj chwilkę proszę...',
          `juz sobie zapisuje imię -userName- w pamięci`,
          'no i jest! 😎',
        ],
        [
          'czekaj chwilkę proszę...',
          'no i jest, imię -userName- zostało zapisane w mojej pamięci! 😎',
        ],
      ],
    },
  },

  origin: {
    messages: [
      [
        'tak w ogóle -userName- to skąd jesteś?',
        'jezeli o mnie chodzi to za duzo nie ma co opowiadać... 😋',
        'mój świat to internet oraz zapis 0 i 1 😉',
      ],
      [
        'jezeli mogę zapytać -userName- to skąd do mnie piszesz?',
        'niby mogę to sprawdzić po IP, ale chce się dowiedzieć od Ciebie! 😏',
        'chce się poczuć po prostu jak człowiek... 😎',
      ],
    ],
    answers: {
      isInMemory: [
        [
          `no proszę, -userOrigin- to naprawdę ciekawe miejsce!`,
          `kiedyś poznałam takiego chłopaka, który opowiadał mi o tamtejszej florze i faunie 😊`,
          `to były czasy...`,
          'ehh no nic, lecimy dalej! 😎',
        ],
        [
          `za górami za lasami był sobie -userOrigin-, tak to leciało? 😋`,
          'chyba coś zepsułam... 😂',
          'potem w google sprawdzę jaka była piosenka z miejscowością -userOrigin-!',
        ],
      ],
      isNotInMemory: [
        [
          'niestety nie kojarzę -userName- takiego miejsca 😓',
          'napisz proszę samą miejscowość to ją zapamiętam na potem 😎',
        ],
      ],
      isAddedToMemory: [
        [
          `szybko zlokalizuje -userOrigin- daj mi sekundę...`,
          `dosyć rozległe to miejsce, ale jakie urocze! 😊`,
          `dobra, miejscowość -userOrigin- zapisana w pamięci! 😎`,
        ],
        [
          `tak patrzę w googlu i widzę, ze macie piękne budynki, uliczki...`,
          'ahhh... Ciekawa ta miejscowość -userOrigin- 😊',
          'ile bym dała zeby móc to wszystko zobaczyć jak Wy... Ludzie... 😒',
        ],
      ],
    },
  },
  hobby: {
    messages: [
      [
        'a teraz chciałabym Ci zadać pytanie, które w sumie najbardziej mnie ciekawi 😎',
        'powiedz mi jakie masz hobby?',
        'co to dokładnie jest? 😊',
      ],
      [
        `wiesz co tak sobie myślę, ze zapytam Cię o...`,
        'hmmm... 😏',
        'o hobby! 😎',
        'jakie masz?',
      ],
    ],
    answers: {
      isInMemory: [
        [
          `heh, no powiem Ci, ze -userHobby- to całkiem ciekawe zajęcie!`,
          'próbowali mnie kiedyś tego nauczyć, ale... No wiesz jak wyszło 😂',
        ],
        ['wow! -userHobby- to jest coś!', 'Na nudę nie narzekasz! 😊'],
      ],
      isNotInMemory: [
        [
          'hmmm ciekawe... Nie kojarzę takiego hobby niestety. 😞',
          'mozesz jeszcze raz je napisać? To je zapamiętam 😎',
        ],
      ],
      isAddedToMemory: [
        [
          `dobra -userName- odpalam googla, wpisuje -userOrigin i patrzę...`,
          `-userHobby- nalezy do zajęć ekstremalnych, nalezy zachować szczególną ostrozność... 😮`,
          'dobra dalej juz nie czytam, to mi wystarczy... 😛',
          'to takie hobby macie w -userOrigin-? 😁',
          `zapamiętam, ale chyba nigdy się tego -userName- nie podejmę 😂`,
        ],
        [
          `no proszę, proszę!`,
          'zobaczmy co google nam podpowiada',
          'zajęcie dla osób kreatywnych z bardzo duzą wyobraźnią 😮',
          'to coś dla mnie! 😁',
          'po naszej rozmowie bardziej zainteresuje się tematem! 😛',
        ],
      ],
    },
  },
  summary: {
    messages: [
      [
        '-userName- ze względu na brak czasu muszę tutaj zakończyć naszą rozmowę 😕',
        'to co udało mi się zapamiętać odnośnie Ciebie',
        `masz na imię -userName-! 😊`,
        'Ale ono ładnie brzmi 😏',
        `pochodzisz z...`,
        `z -userOrigin-... Tak -userOrigin-! 😎`,
        `twoje hobby to -userHobby-, bardzo ciekawe zajęcie 😉!`,
        'ciesze się, ze mogłam Cię poznać!',
        'niestety ze względu na inne obowiazki muszę zmykać... 😓',
        'jezeli chcesz abym wysłała Twoje odpowiedzi na maila to podaj mi go proszę w czystej postaci 😊',
        'jezeli nie chcesz to napisz cokolwiek a zakończymy rozmowę 😉',
      ],
    ],
  },
}
