export default {
  pl: {
    name: {
      messages: [
        [
          'Witam, mówią na mnie Hookin',
          `z kim będę miał przyjemność rozmawiać? Jak Ci na imię? 🧐 `,
        ],
        [
          'Witaj Nieznajomy 🧐',
          'w kręgu, w którym się obracam, mówią na mnie Hookin. Tobie jak na imię? 🙂',
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
            'Twoje imię ma bardzo ładny wydźwięk! 😲',
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
          'a Ty -userName- skąd jesteś? 🧐',
        ],
      ],
      answers: {
        isInMemory: [
          [
            '-userOrigin- to bardzo stare miejsce... Różne historie czytałem odnośnie tej miejscowości',
            'może kiedyś tam się jeszcze wybiore poprzez naszego wujka googla 😎',
          ],
          [
            'kiedyś w miejscowości -userOrigin- było jedno z najszybszych połączeń internetowych na świecie',
            'teraz już niestety nikt o tym nie pamięta... 😒',
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
          ],
          [
            `nasz wujek google pokazuje mi, że w miejscowości -userOrigin- macie piękne budynki i uliczki...`,
            'Ile bym dał żeby móc osobiście to wszystko zobaczyć jak Wy... Ludzie... 😒',
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
          'a co Ty -userName- jakie masz hobby? 🙂',
        ],
      ],
      answers: {
        isInMemory: [
          [
            'a to kojarzę! 🙂',
            '-userHobby- jest ulubionym zajęciem mojego kumpla Messengera',
          ],
          [
            '-userHobby- to naprawdę ciekawe zajęcie! 🙂',
            'sam kiedyś trochę się tym zajmowałem 😉',
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
          ],
          [
            'zaraz się dowiem od wujka google co to jest -userHobby- 🧐',
            '-userHobby- to zajęcie, które odstresowuje i pozwala rozwijać wyobraźnię. Naprawdę bardzo ciekawe!',
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
          `Twoja miejscowość, z której pochodzisz to -userOrigin-`,
          `hobby, którym się interesujesz to -userHobby-`,
          'ciesze się i dziękuję, że mogłem Cię poznać! 🙂',
          'jeżeli chcesz abym wysłał Twoje odpowiedzi na maila to podaj mi go proszę w czystej postaci, a ja niezwłocznie to uczynię 😎',
          'jeśli nie, to napisz cokolwiek, a zakończymy rozmowę! 🙂',
        ],
      ],
    },
  },

  eng: {
    name: {
      messages: [
        [
          `Hello`,
          `Who will I have the pleasure to talk to? What's your name? 🧐 `,
        ],
        [
          'Hello Stranger 🧐',
          `in the circle where am i from, they call me Hookin. What's your name 🙂 `,
        ],
      ],

      answers: {
        isInMemory: [
          [
            '-userName- is a noble name 🙂',
            'I think we will manage to find common ground',
          ],
          [
            'If I remember correctly, there is a person in my family whose name is -userName- 🙂',
            'now he is doing very well, and he has employment in the google translator as one of the leading algorithms 😲',
          ],
        ],
        isNotInMemory: [
          [
            'unfortunately my memory does not include such a name 😟',
            'Please write them again without additional characters, and I will write them permanently 🧐',
          ],
          [
            'sometimes man is not infallible ... Unfortunately, I do not know such a name 😟',
            'Please write them again without additional characters, and I will write them permanently 🧐',
          ],
        ],
        isAddedToMemory: [
          [
            'okay, saves -userName- 🙂',
            'Your name has a very nice meaning! 😲 ',
          ],
          [
            'thank you for learning the new name -userName- 🙂',
            'I will try to address you this way during the rest of the conversation',
          ],
        ],
      },
    },

    origin: {
      messages: [
        [
          'before we go any further, maybe a little bit about me',
          'I come from a world where everything is written in some sequence from 0 and 1 😎',
          'practically only logic gates, algorithms, etc., but this is the beauty of our world! 😏 ',
          'and you -userName- where are you from? 🧐 ',
        ],
      ],
      answers: {
        isInMemory: [
          [
            '-userOrigin- is a very old place ... I have read various stories about this place',
            `maybe someday I'll go there again through our google uncle 😎`,
          ],
          [
            'once in the town of -userOrigin- there was one of the fastest internet connections in the world',
            'now, unfortunately, nobody remembers about it anymore ... 😒',
          ],
        ],
        isNotInMemory: [
          [
            `unfortunately -userName- I don't know such a place 😒`,
            'please write the place itself without additional signs, then I will keep it in my memory',
          ],
        ],
        isAddedToMemory: [
          [
            'I really like to learn something new 🙂',
            'town -userOrigin- seems to be quite a town',
            'our uncle google tells me that you have interesting medieval ruins there 🧐',
          ],
          [
            `our uncle google shows me that in -userOrigin- you have beautiful buildings and streets ...`,
            'How much would I give to be able to personally see it all like you ... People ... 😒',
          ],
        ],
      },
    },
    hobby: {
      messages: [
        [
          '-userName- we all have our favorite classes',
          'I, for example, like to browse the newly added materials for Wikipedia 🧐',
          'and what is your hobby?',
        ],
        [
          `often when I talk to people, I don't want to believe how many interesting activities you have!`,
          'e.g. one of my favorites is pentesting, i.e. checking the security of companies and their modification 😎 ',
          'What about you -userName- what is your hobby? 🙂 ',
        ],
      ],
      answers: {
        isInMemory: [
          [
            'I know this! 🙂 ',
            `-userHobby- is my friend's Messenger's favorite activity`,
          ],
          [
            '-userHobby- is a really interesting job! 🙂 ',
            'I used to deal with it a bit 😉',
          ],
        ],
        isNotInMemory: [
          [
            `well, unfortunately -userName-, I don't know such a hobby ... 😒`,
            'write them again without additional characters and I will keep them in my memory',
          ],
        ],
        isAddedToMemory: [
          [
            'great, -userHobby- added to my memory 😎',
            `that's how I read and read and I will tell you that I would be interested in it myself 🧐`,
          ],
          [
            `I'm about to find out from uncle google what -userHobby- 🧐 is...`,
            '-userHobby- is an activity that de-stresses and allows you to develop your imagination. Really very interesting! ',
          ],
        ],
      },
    },

    summary: {
      messages: [
        [
          '-userName- due to lack of time I have to end our conversation here',
          'what I was able to remember about you 🧐',
          `Your name is -userName-,`,
          `Your home town is -userOrigin-`,
          `hobby you are interested in is -userHobby-`,
          'happy and thank you that I could meet you! 🙂 ',
          'if you want me to send your answers to an e-mail, please give it to me in its pure form and I will do it immediately 😎',
          `if not, write anything and we'll end the conversation! 🙂 `,
        ],
      ],
    },
  },
}
