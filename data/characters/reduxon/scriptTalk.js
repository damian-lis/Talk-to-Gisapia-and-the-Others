export default {
  pl: {
    name: {
      messages: [['Siema! 😎', `jestem Reduxon!`, 'jak masz na imię?']],
      answers: {
        isInMemory: [
          [
            'heh, taka śmieszna sprawa bo ostatnio przyłożyłem osobie o imieniu -userName- 😅',
            'wiesz chciała mnie zlagować i dostała prądem z laptopa... 😂',
            'nie popełnij tego błędu! 😋',
            'oczywiście ma się już dobrze!',
          ],
          [
            'mówisz, że -userName-?',
            'kojarzę takie imię, kiedyś wybiłem zęba osobie, która tak się nazywała 😅',
            'tzn. wirtualnego zęba... 😂',
            'w świecie 0 i 1 ból jest tak samo odczuwalny jak u Was 😈',
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

    origin: {
      messages: [
        [
          'jak się nazywa miasto z którego pochodzisz?',
          'wiesz, jeżeli o mnie chodzi to mój świat to 0 i 1... 😉, za dużo zieleni to tutaj nie ma... 😂',
        ],
        [
          'coś mi się lokalizacja po IP zawiesiła... 😓',
          'dobra... nie dam rady... muszę Cię zapytać...',
          'z jakiej miejscowości jesteś?',
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
            'miejscowość -userOrigin- jest naprawdę spoko, taki kumpel Apachi tam mieszka',
            'ale nie będę Cię teraz tym zanudzał 😉',
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
            'czyli tak wygląda miejscowość -userOrigin- w google maps',
            'widzę -userName-, że na tereny leśne też nie narzekacie 😎',
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
          'jakie masz hobby w tej miejscowości -userOrigin-? 😏',
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
            'ja natomiast uwielbiam oglądać te wasze kotki i pieski z moim kumplem Youtube 🙃',
          ],
          [
            '-userHobby- brzmi mega ciekawie i trochę tak niebezpiecznie! 😈',
            'tak czytam i widzę, że polubił bym te klimaty! 😎',
            'ja natomiast uwielbiam oglądać te wasze kotki i pieski z moim kumplem Youtube 🙃',
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
          'fajnie było Cię poznać! 😎',
          'jeżeli chcesz abym wysłał Twoje odpowiedzi na maila to podaj mi go w czystej postaci 😊',
          'jeśli nie to napisz cokolwiek, a ja się zawinę! 😉',
        ],
      ],
    },
  },

  eng: {
    name: {
      messages: [['Hello! 😎 ', `I am Reduxon!`, ` What's your name? `]],
      answers: {
        isInMemory: [
          [
            'heh, such a funny thing because recently I hit someone named -userName- 😅',
            'you know she wanted to lend me down and got electric from her laptop ... 😂',
            `don't make that mistake! 😋 `,
            'Of course he is fine now!',
          ],
          [
            'you say -userName-?',
            'I associate such a name, once I broke a tooth of a person who was called that 😅',
            'i.e. virtual tooth ... 😂 ',
            'in world 0 and 1 pain is just as felt as in you 😈',
          ],
        ],

        isNotInMemory: [
          [
            `I've never seen such a name`,
            'Write them again without additional characters, and I will remember them and learn something new! 😎 ',
          ],
          [
            'hmmm ...',
            `none of this ... I don't remember this name 😞`,
            'Write them again without additional characters, and I will remember them and learn something new! 😎 ',
          ],
        ],
        isAddedToMemory: [
          ['and elegant, -userName- fell into my red memory! 😈 '],
          [
            'guitar, my memory has been enriched with the name -userName-, yeah! 😈 ',
          ],
        ],
      },
    },

    origin: {
      messages: [
        [
          'what is the name of the city you come from?',
          'you know, as far as I am concerned, my world is 0 and 1 ... 😉, too much green is not here ... 😂',
        ],
        [
          'I have something wrong with my IP location ... 😓',
          `okay ... I can't make it ... I have to ask you ...`,
          'what town are you from?',
        ],
      ],

      answers: {
        isInMemory: [
          [
            '-userOrigin- are good old grounds',
            'I used to go there on google maps 😎',
            'you have a nice shop next to that big building 😉',
          ],
          [
            'the town of -userOrigin- is really cool, this buddy Apachi lives there',
            `but I won't bore you with it now 😉`,
          ],
        ],
        isNotInMemory: [
          [
            `I don't know such a place 😞`,
            'Enter the town exactly without any additional characters and I will remember it! 😎 ',
          ],
        ],
        isAddedToMemory: [
          [
            'this place is interesting',
            'so this is how -userOrigin- looks like in google maps',
            `I can see -userName- that you don't complain about forest areas either 😎`,
          ],
          [
            'cool seat reservation ten -userOrigin-',
            'if I could only materialize, I would pick up a lady there ... 😂',
          ],
        ],
      },
    },

    hobby: {
      messages: [
        [
          'now -userName- a hundred-point question!',
          'what do you do in your spare time?',
          'i.e. what is your hobby in this locality -userOrigin-? 😏 ',
        ],
        [
          `ok, let's go -userName- to my favorite question!`,
          `What's your hobby in this town -userOrigin-? 😏 `,
        ],
      ],
      answers: {
        isInMemory: [
          [
            '-userHobby- this is it!',
            'I often watch YouTube videos about it',
            `I'll tell you that this is a very interesting activity 😎`,
          ],
          [
            'Are you also interested in this -userName-?',
            '-userHobby- has been my hobby since I was a child',
            'i.e. from the first lines of code ... 😁 ',
          ],
        ],
        isNotInMemory: [
          [
            `look, I'm so smart, and I don't know this hobby ...`,
            'Just write me what your favorite activity is called and I will remember it! 😎 ',
          ],
        ],
        isAddedToMemory: [
          [
            `-userHobby-, let's see...`,
            'they write that this is a hobby more for quiet people ...',
            'or rather not for me 😅',
            'I love to watch your kitties and dogs with my friend Youtube 🙃',
          ],
          [
            '-userHobby- sounds super interesting and a bit so dangerous! 😈 ',
            `that's how I read and I can see that I would like this atmosphere! 😎 `,
            'I love to watch your kitties and dogs with my friend Youtube 🙃',
          ],
        ],
      },
    },
    summary: {
      messages: [
        [
          '-userName- I have to finish here due to lack of time 😔',
          `lest there were, I managed to remember something during today's conversation 😀`,
          `so yeah your name is -userName-, `,
          `you live in -userOrigin-,`,
          `and your hobby is -userHobby-`,
          'It was fun to meet you! 😎 ',
          'if you want me to send your replies to an e-mail, give it to me in its pure form 😊',
          `if not, write something and I'll get wrapped! 😉 `,
        ],
      ],
    },
  },
};
