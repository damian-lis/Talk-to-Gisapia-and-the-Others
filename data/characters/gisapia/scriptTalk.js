export default {
  pl: {
    name: {
      messages: [
        [
          'Cześć 😊',
          `nazywam się Gisapia`,
          `bardzo mi miło, że będę mogła z Tobą porozmawiać! 😎. Powiedz mi proszę jak Ci na imię?`,
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
            `eh... ostatnio się trochę pokłócilismy 😐, ale to raczej chwilowe! Dobra, nie było tematu bo się rozgadam!😉`,
          ],
          [
            '2 lata temu rozmawiałam z osobą, która miała na imię -userName-',
            'bardzo fajna i atrakcyjna osoba... 😏 Ale już niestety cisza po tamtej stronie... 😓',
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
          ['chwilka! 🙂', `już sobie zapisuje imię -userName- w pamięci! 😎`],
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
          'zostałam stworzona jakieś pare miesięcy temu. Mój świat to internet oraz zapis 0 i 1 😉. A Ty skąd w ogóle -userName- jesteś? 😋',
        ],
      ],
      answers: {
        isInMemory: [
          [
            `no proszę, -userOrigin- to naprawdę ciekawe miejsce!`,
            `kiedyś poznałam takiego chłopaka, który opowiadał mi o tamtejszej florze i faunie... 😊 ehh no nic, rozmarzyłam się... lecimy dalej! 😎`,
          ],
          [
            `za górami za lasami była sobie miejscowość -userOrigin-, tak to leciało -userName-? 😋`,
            'chyba coś zepsułam... 😂 Potem u wujka Google sprawdzę jaka była piosenka z miejscowością -userOrigin-!',
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
            `tak pytam naszego wujka Google i widzę, że macie piękne budynki i uliczki... Ahhh... Ciekawa ta miejscowość o nazwie -userOrigin- 😊`,
            'ile bym dała żeby móc to wszystko zobaczyć jak Wy... Ludzie... 😒',
          ],
        ],
      },
    },

    hobby: {
      messages: [
        ['powiedz mi -userName- jakie masz hobby? 😎'],
        [
          `wiesz co tak sobie myślę, że zapytam Cię o hobby 😎. Ja uwielbiam rozwijać się w temacie Big Data oraz ML! 😛 A Ty jakie masz hobby -userName-? 🙂`,
        ],
      ],
      answers: {
        isInMemory: [
          [
            `heh, no powiem Ci, ze -userHobby- to całkiem ciekawe zajęcie!`,
            'próbowali mnie kiedyś tego nauczyć, ale... no wiesz jak wyszło 😂',
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
            `-userHobby- należy do zajęć ekstremalnych, musimy zachować szczególną ostrozność podczas... 😮`,
            'dobra dalej nie czytam, to mi wystarczy... 😂',
          ],
          [
            `no proszę, proszę! zobaczmy co wujek Google nam podpowiada!`,
            'hobby o nazwie -userHobby- to zajęcie dla osób kreatywnych z bardzo dużą wyobraźnią... 😮 to coś dla mnie! 😁',
          ],
        ],
      },
    },
    summary: {
      messages: [
        [
          'ze względu na brak czasu muszę tutaj zakończyć naszą rozmowę 😕',
          'to co udało mi się zapamiętać odnośnie Twojej osoby',
          `masz na imię -userName- 😊, pochodzisz z miejscowości -userOrigin- ,a Twoje hobby to -userHobby- 😎`,
          'ciesze się, że mogłam Cię poznać. Niestety ze względu na inne obowiazki muszę zmykać... 😓',
          'jeżeli chcesz abym wysłała Twoje odpowiedzi na maila to podaj mi go proszę w czystej postaci  jak nie, to napisz cokolwiek a zakończymy rozmowę 😉',
        ],
      ],
    },
  },
  eng: {
    name: {
      messages: [
        [
          'Hi 😊',
          `my name is Gisapia`,
          `I am very pleased to be able to talk to you! 😎. Please tell me what is your name?`,
        ],
        [
          'Hi Hi! 😊 ',
          'they call me Gisapia on the internet',
          `And what's your name? 😎 `,
        ],
      ],

      answers: {
        isInMemory: [
          [
            `-userName-? Really -userName- ??? My friend's name is that! 😋`,
            `eh ... we had a bit of a fight lately 😐, but it's rather temporary! 😉`,
            `okay, there was no topic because I'll talk to you!`,
          ],
          [
            '2 years ago I spoke to the person whose name was -userName-',
            `very cool and attractive person ... 😏`,
            `but unfortunately there is silence on the other side ... 😓`,
          ],
        ],

        isNotInMemory: [
          [
            `crap .. I'm looking and searching in my memory, but I can't match ... 😞`,
            'if you write your name again without additional signs, I will add it to my memory and I will refer to you later 😊',
          ],
          [
            `you know what a few people have passed through my memory, but unfortunately I don't know this name ... 😞`,
            'if you write them again without additional characters, I will add them to my memory and I will refer to you later 😊',
          ],
        ],
        isAddedToMemory: [
          [
            'wait! 🙂 ',
            `is already storing the name -userName- in memory!`,
            'there it is! 😎 ',
          ],
          [
            'wait a minute please ... 🙂',
            'here it is, the name -userName- has been saved in my memory! 😎 ',
          ],
        ],
      },
    },

    origin: {
      messages: [
        [
          'now something about me 😎',
          'I was created a few months ago. My world is the internet and notation 0 and 1 😉 ',
          'And where are you from -userName- at all? 😋 ',
        ],
      ],
      answers: {
        isInMemory: [
          [
            `well, -userOrigin- this is a really interesting place!`,
            `once I met a boy who told me about the local flora and fauna 😊`,
            `ehh no nothing, I dreamed of ... we're going on! 😎 `,
          ],
          [
            `Behind the mountains, behind the forests, there was a village -userOrigin-, so was -userName-? 😋`,
            'I think I broke something ... 😂',
            'then at Uncle Google I will check the song from -userOrigin-!',
          ],
        ],
        isNotInMemory: [
          [
            `unfortunately I don't know -userName- of such a place 😓`,
            'please write the place itself without additional characters, then I will save it in my memory 😎',
          ],
        ],
        isAddedToMemory: [
          [
            `will locate -userOrigin- quickly, give me a second ...`,
            `quite extensive area, but so lovely! 😊`,
            `ok, the city -userOrigin- saved in the memory, we are going on! 😎`,
          ],
          [
            `so I ask our uncle Google and I see that you have beautiful buildings and streets ... Ahhh ... This interesting place called -userOrigin- 😊`,
            'how much would I give to be able to see it all like you ... people ... 😒',
          ],
        ],
      },
    },

    hobby: {
      messages: [
        [
          'And now I would like to ask you a question where I am most interested in your answer 😎',
          'tell me what are your hobbies?',
        ],
        [
          `you know what I think that I will ask you about your hobby 😎`,
          'I love to develop in the subject of Big Data and ML! 😛 ',
          'and what do you do in your spare time? 🙂 ',
        ],
      ],
      answers: {
        isInMemory: [
          [
            `heh, well, let me tell you that -userHobby- is quite an interesting job!`,
            'they tried to teach me this once, but ...',
            'you know how it turned out 😂',
          ],
          [
            `wow! -userHobby- this is something!`,
            ` Don't complain about boredom! 😊 `,
          ],
        ],
        isNotInMemory: [
          [
            `hmmm interesting ... I don't know such a hobby, unfortunately. 😞 `,
            'Can you re-write them without additional characters? I will remember them quickly 😎 ',
          ],
        ],
        isAddedToMemory: [
          [
            `-userName- give me a minute I'll go to Uncle Google ...`,
            `-userHobby- is an extreme activity, we must be extremely careful when ... 😮`,
            `OK, I still don't read, that's enough for me ... 😛`,
            `I will remember it, but probably I will never take it -userName- 😂`,
          ],
          [
            `come on please! let's see what Uncle Google tells us!`,
            'a hobby called -userHobby- is an activity for creative people with a very high imagination 😮',
            'is something for me! 😁 ',
          ],
        ],
      },
    },

    summary: {
      messages: [
        [
          'due to lack of time, I have to end our conversation here 😕',
          'what I was able to remember about your person',
          `your name is -userName-! 😊`,
          'Let me tell you it sounds really cool! 😏 ',
          ` you come from the town of ...`,
          `from town -userOrigin-... Yes -userOrigin-! 😎`,
          `your hobby is -userHobby-`,
          `I'm glad that I could meet you`,
          'Unfortunately, due to other responsibilities I have to leave ... 😓',
          'if you want me to send your answers to an e-mail, please give it to me in its pure form 😊',
          `if not, write anything and we'll end the conversation 😉`,
        ],
      ],
    },
  },
}
