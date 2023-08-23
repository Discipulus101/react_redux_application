# Description of the project

The project was created to train working with the stack: React, TypeScript, Redux Toolkit, RTKQuery, jest + react-testing-lib, cypress.

## Application structure and functionality

### Application main page

- [x] list of cards, each of which displays a picture and information that came from the endpoint (public API selected [Disney API](https://disneyapi.dev/))
- [x] filter button

### Application operation

- [x] application implemented as SPA
- [x] filter button:
  - [x] is active only if there are liked cards
  - [x] when you click on the button, only liked cards are shown, the text on the button changes
  - [x] when pressed again, all cards are displayed again, the text on the button changes
- [x] incoming data is stored in store
- [x] while the image on the card is loading, the user sees the loader
- [x] there is a like icon on the card:
  - [x] when you click on the button, put or remove a like
  - [x] icon is tinted when liked
- [x] there is a delete icon on the card:
  - [x] when you click on the button, the card is deleted
  - [x] when deleting all cards, the corresponding inscription is displayed
- [x] clicking on image opens gallery (using [Core Components Gallery](https://core-ds.github.io/core-components/master))
- [x] implemented adaptive layout (breakpoints: 1440px, 1024px, 768px, 425px)
