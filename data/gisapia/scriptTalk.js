export default {
  name: {
    messages: [
      [
        'Cześć 😊',
        `nazywam się Gisapia`,
        `bardzo mi miło, że będę mogła z Tobą porozmawiać! 😎`,
        'powiedz mi proszę jak Ci na imię?',
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
          `-userName-? Naprawdę -userName-??? Moja znajoma osoba ma tak na imię! 😋`,
          `eh... ostatnio się trochę pokłócilismy 😐, ale to raczej chwilowe! 😉`,
          'dobra, nie było tematu bo się rozgadam!',
        ],
        [
          '2 lata temu rozmawiałam z osobą, która miała na imię -userName-',
          'bardzo fajna...',
          'i atrakcyjna osoba 😏',
          'ale już niestety cisza po tamtej stronie... 😓',
          'jak to u Was mówią, życie...',
        ],
      ],

      isNotInMemory: [
        [
          'kurcze.. Szukam i szukam w pamięci, ale nie mogę skojarzyć... 😞',
          'jak napiszesz jeszcze raz swoje imię bez dodatkowych znaków to dodam je do pamięci i będę się tak do Ciebie potem zwracać 😊',
        ],
        [
          'wiesz co trochę osób się przewinęło przez moją pamięć, ale tego imienia niestety nie kojarzę... 😞',
          'jak napiszesz je jeszcze raz bez dodatkowych znaków to dodam je do pamięci i będę się tak do Ciebie potem zwracać 😊',
        ],
      ],
      isAddedToMemory: [
        [
          'chwilka! 🙂',
          `już sobie zapisuje imię -userName- w pamięci!`,
          'no i jest! 😎',
        ],
        [
          'poczekaj chwilkę proszę... 🙂',
          'no i jest, imię -userName- zostało zapisane w mojej pamięci! 😎',
        ],
      ],
    },
  },

  origin: {
    messages: [
      [
        'teraz coś może o mnie 😎',
        'zostałam stworzona jakieś pare miesięcy temu...',
        'mój świat to internet oraz zapis 0 i 1 😉',
        'nic ciekawego, algorytmy, bramki logiczne, procesy..., wszyscy gadają w JS 😂',
        'no także tak to wygląda 🙂',
        'a Ty skąd w ogóle -userName- jesteś? 😋',
        'z jakiej miejscowości?',
      ],
      [
        'teraz tak krótko o mnie 😎',
        'zostałam stworzona jakieś pare miesięcy temu...',
        'mój świat to internet oraz zapis 0 i 1 😉',
        'nic ciekawego, algorytmy, procesy, bramki logiczne itd., wszyscy gadają w JS 😂',
        'no także tak to wygląda 🙂',
        'a Ty -userName- skąd do mnie piszesz?',
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
          'ehh no nic, rozmarzyłam się... lecimy dalej! 😎',
        ],
        [
          `za górami za lasami była sobie miejscowość -userOrigin-, tak to leciało -userName-? 😋`,
          'chyba coś zepsułam... 😂',
          'potem u wujka Google sprawdzę jaka była piosenka z miejscowością -userOrigin-!',
        ],
      ],
      isNotInMemory: [
        [
          'niestety nie kojarzę -userName- takiego miejsca 😓',
          'napisz proszę samą miejscowość bez dodatkowych znaków to ją zapiszę w pamięci 😎',
        ],
      ],
      isAddedToMemory: [
        [
          `szybko zlokalizuje miejscowość -userOrigin-, daj mi sekundę...`,
          `dosyć rozległy obszar, ale jaki uroczy! 😊`,
          `ok, miejscowość -userOrigin- zapisana w pamięci, lecimy dalej! 😎`,
        ],
        [
          `tak pytam naszego wujka Google i widzę, że macie piękne budynki i uliczki...`,
          'ahhh... Ciekawa ta miejscowość o nazwie -userOrigin- 😊',
          'ile bym dała żeby móc to wszystko zobaczyć jak Wy... Ludzie... 😒',
          'no nic, może kiedyś... lecimy dalej! 😎',
        ],
      ],
    },
  },

  hobby: {
    messages: [
      [
        'a teraz chciałabym Ci zadać pytanie gdzie najbardziej ciekawi mnie Twoja odpowiedź 😎',
        'powiedz mi jakie masz hobby?',
        'moje to komentowanie Waszego życia z moim kolegą Instagramem! 😄',
        'lubimy po prostu patrzeć jak sobie ciekawie żyjecie 🙂',
        'a Ty co tam robisz w wolnym czasie -userName-? 😊',
      ],
      [
        `wiesz co tak sobie myślę, że zapytam Cię o...`,
        'hmmm... 😏',
        'o hobby! 😎',
        'ja uwielbiam rozwijać się w temacie Big Data oraz ML! 😛',
        'tematy bardzo na topie!',
        'a Ty co robisz w wolnym czasie? 🙂',
      ],
    ],
    answers: {
      isInMemory: [
        [
          `heh, no powiem Ci, ze -userHobby- to całkiem ciekawe zajęcie!`,
          'próbowali mnie kiedyś tego nauczyć, ale...',
          'no wiesz jak wyszło 😂',
        ],
        ['wow! -userHobby- to jest coś!', 'Na nudę nie narzekasz! 😊'],
      ],
      isNotInMemory: [
        [
          'hmmm ciekawe... Nie kojarzę takiego hobby niestety. 😞',
          'możesz jeszcze raz je napisać bez dodatkowych znaków? To je szybko zapamiętam 😎',
        ],
      ],
      isAddedToMemory: [
        [
          `-userName- daj mi chwilę pójdę do wujka Google...`,
          'więc tak...',
          `-userHobby- należy do zajęć ekstremalnych, musimy zachować szczególną ostrozność podczas... 😮`,
          'dobra dalej nie czytam, to mi wystarczy... 😛',
          'to takie hobby macie w miejscowości -userOrigin-? 😁',
          'no to powiem Ci, że ciekawie macie 😋',
          `zapamiętam to, ale chyba nigdy się tego -userName- nie podejmę 😂`,
        ],
        [
          `no proszę, proszę!`,
          'zobaczmy co wujek Google nam podpowiada',
          'hobby o nazwie -userHobby- to zajęcie dla osób kreatywnych z bardzo dużą wyobraźnią 😮',
          'to coś dla mnie! 😁',
          'po naszej rozmowie bardziej zainteresuje się tematem! 😛',
        ],
      ],
    },
  },
  summary: {
    messages: [
      [
        'ze względu na brak czasu muszę tutaj zakończyć naszą rozmowę 😕',
        'to co udało mi się zapamiętać odnośnie Twojej osoby',
        `masz na imię -userName-! 😊`,
        'powiem Ci że naprawdę fajnie brzmi! 😏',
        `pochodzisz z miejscowości...`,
        `z miejscowości -userOrigin-... Tak -userOrigin-! 😎`,
        `twoje hobby to -userHobby-`,
        'ciesze się, że mogłam Cię poznać',
        'niestety ze względu na inne obowiazki muszę zmykać... 😓',
        'jeżeli chcesz abym wysłała Twoje odpowiedzi na maila to podaj mi go proszę w czystej postaci 😊',
        'jak nie, to napisz cokolwiek a zakończymy rozmowę 😉',
      ],
    ],
  },
}
