import { REQUESTED_NUMBER_OF_FILMS } from '/constants/constants.ts';

const likeButtonTestId = 'likeButton';
const deleteButtonTestId = 'deleteButton';
const likedShowButtonTestId = 'likedShowButton';
const spinnerTestId = 'spinner';
const filmCardTestId = 'filmCard';

describe('application functionality testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be displayed spinner component on load', () => {
    cy.findByTestId(spinnerTestId).should('be.visible');
  });

  it('should be loaded and displayed specified number of movies', () => {
    cy.findAllByTestId('filmCard').should(
      'have.length',
      REQUESTED_NUMBER_OF_FILMS
    );
  });

  it('should be disabled button for showing like cards if none of the cards has a like', () => {
    cy.findByTestId('likedShowButton').should('be.disabled');
  });

  it('should not be disabled button for show like cards if one of the cards has a like', () => {
    cy.findAllByTestId(filmCardTestId).then((cards) => {
      const selectedCard = cards[0];

      cy.wrap(selectedCard).findByTestId(likeButtonTestId).click();
      cy.findByTestId(likedShowButtonTestId).should('not.be.disabled');
    });
  });

  it('should display only cards that have likes when click on the show liked cards button', () => {
    cy.findAllByTestId(filmCardTestId).then((cards) => {
      const selectedCard = cards[0];

      cy.wrap(selectedCard).findByTestId(likeButtonTestId).click();
      cy.findByTestId(likedShowButtonTestId).click();

      cy.findAllByTestId(filmCardTestId).should('have.length', 1);
    });
  });

  it('should delete card after click on delete button', () => {
    cy.findAllByTestId(filmCardTestId).then((cards) => {
      const cardCount = cards.length;
      const selectedCard = cards[0];

      cy.wrap(selectedCard).findByTestId(deleteButtonTestId).click();
      cy.findAllByTestId(filmCardTestId).should('have.length', cardCount - 1);
    });
  });
});
