const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Je wordt wakker op een vreemde plek en je ziet een pot blauwe smurrie bij je in de buurt',
    options: [
      {
        text: 'Pak de smurrie',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Laat de smurrie liggen',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Je zoektocht naar antwoorden gaat door, als je een handelaar tegenkomt.',
    options: [
      {
        text: 'Ruil de smurrie voor een zwaard',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Ruil de smurrie voor een schild',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Negeer de handelaar',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Nadat je de handelaar hebt verlaten, begin je je moe te voelen en zie je in de verte een klein stadje naast een gevaarlijk uitziend kasteel.',
    options: [
      {
        text: 'Verken het kasteel',
        nextText: 4
      },
      {
        text: 'Zoek een kamer om in te slapen in de stad',
        nextText: 5
      },
      {
        text: 'Zoek wat hooi in een stal om in te slapen',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Je bent zo moe dat je in slaap valt terwijl je het kasteel verkent, en in je slaap wordt vermoord door een vreselijk monster.',
    options: [
      {
        text: 'Opnieuw beginnen',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Zonder dat je geld hebt om een ​​kamer te kopen breek je in bij de dichtstbijzijnde herberg en val je in slaap. Na een paar uur slapen vindt de eigenaar van de herberg je en laat de stadsbewaker je opsluiten in een cel.',
    options: [
      {
        text: 'Opnieuw beginnen',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Je wordt goed uitgerust en vol energie wakker om het nabijgelegen kasteel te verkennen',
    options: [
      {
        text: 'Verken het kasteel',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Terwijl je het kasteel aan het verkennen bent,
    options: [
      {
        text: 'Probeer weg te rennen',
        nextText: 8
      },
      {
        text: 'Val aan met je zwaard',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Schuil achter je schild',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Gooi de blauwe smurrie tegen het aan',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Je poging om weg te rennen zijn mislukt en het monster vangt gemakkelijk.',
    options: [
      {
        text: 'Opnieuw beginnen',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Je dacht als een dwaas dat dit monster kon worden vermoord met enkel een zwaard',
    options: [
      {
        text: 'Opnieuw beginnen',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Het monster lachte toen je je achter je schild verstopte en je opat.',
    options: [
      {
        text: 'Opnieuw beginnen',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Je gooide je pot smurrie naar het monster en het explodeerde. Nadat de smurrie was neergedaald, zag je dat het monster werd vernietigd. Als je je overwinning ziet, besluit je dit kasteel op te eisen en de rest van je dagen daar door te brengen',
    options: [
      {
        text: 'Gefeliciteerd!. Speel opnieuw.',
        nextText: -1
      }
    ]
  }
]

startGame()