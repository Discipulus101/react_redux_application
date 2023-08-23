import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { setupStore } from '../../store';
import FilmContainer from './FilmContainer';
import mockFilmsData from './films-data.json';
import { BASE_URL_WITH_ENDPOINT } from '../../constants/constants';

const server = setupServer(
  rest.get(BASE_URL_WITH_ENDPOINT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockFilmsData));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderFilmContainer = () => {
  const store = setupStore();

  return render(
    <Provider store={store}>
      <FilmContainer />
    </Provider>
  );
};

describe('<FilmContainer />', () => {
  const likeButtonTestId = 'likeButton';
  const deleteButtonTestId = 'deleteButton';
  const likedShowButtonTestId = 'likedShowButton';
  const spinnerTestId = 'spinner';
  const filmCardTestId = 'filmCard';
  const numberOfFilms = mockFilmsData.data.length;

  it('should render without errors', () => {
    expect(() => renderFilmContainer()).not.toThrow();
  });

  it('should show spinner', () => {
    renderFilmContainer();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('should show error', async () => {
    server.use(
      rest.get(BASE_URL_WITH_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderFilmContainer();

    const errorElement = await screen.findByText(/error/i);
    expect(errorElement).toBeInTheDocument();
  });

  it('should show films list', async () => {
    renderFilmContainer();

    const filmCards = await screen.findAllByTestId(filmCardTestId);
    expect(filmCards.length).toBe(numberOfFilms);
  });

  it('should be a like buttons', async () => {
    renderFilmContainer();
    const likeButtons = await screen.findAllByTestId(likeButtonTestId);
    expect(likeButtons.length).toBe(numberOfFilms);
  });

  it('should change class like button after click', async () => {
    renderFilmContainer();
    const likeButtons = await screen.findAllByTestId(likeButtonTestId);
    const likeButton = likeButtons[0];

    expect(likeButton).toHaveClass('unLiked');
    fireEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass('isLiked'));
    fireEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass('unLiked'));
  });

  it('there should be a delete buttons', async () => {
    renderFilmContainer();
    const deleteButtons = await screen.findAllByTestId(deleteButtonTestId);
    expect(deleteButtons.length).toBe(numberOfFilms);
  });

  it('should remove the movie after click on the delete button', async () => {
    renderFilmContainer();
    const filmCards = await screen.findAllByTestId(filmCardTestId);
    const deleteButtons = await screen.findAllByTestId(deleteButtonTestId);

    const filmCard = filmCards[0];
    const deleteButton = deleteButtons[0];

    expect(filmCard).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(filmCard).not.toBeInTheDocument();
  });

  describe('display of liked cards', () => {
    it('should be disabled button for cards with likes', async () => {
      renderFilmContainer();

      const likedShowButton = await screen.findByTestId(likedShowButtonTestId);
      expect(likedShowButton).toHaveAttribute('disabled');
    });

    it('should be not disabled button for cards with likes', async () => {
      renderFilmContainer();
      const likeButtons = await screen.findAllByTestId(likeButtonTestId);
      const likeButton = likeButtons[0];

      const likedShowButton = await screen.findByTestId(likedShowButtonTestId);
      expect(likedShowButton).toHaveAttribute('disabled');

      fireEvent.click(likeButton);
      await waitFor(() =>
        expect(likedShowButton).not.toHaveAttribute('disabled')
      );
    });

    it('should be displayed only cards that have likes', async () => {
      renderFilmContainer();
      const filmCards = await screen.findAllByTestId(filmCardTestId);
      expect(filmCards.length).toBe(2);

      const likedShowButton = await screen.findByTestId(likedShowButtonTestId);
      expect(likedShowButton).toHaveAttribute('disabled');

      const likeButtons = await screen.findAllByTestId(likeButtonTestId);
      const likeButton = likeButtons[0];

      fireEvent.click(likeButton);
      fireEvent.click(likedShowButton);

      await waitFor(() =>
        expect(screen.getAllByTestId(filmCardTestId).length).toBe(1)
      );
    });
  });
});
