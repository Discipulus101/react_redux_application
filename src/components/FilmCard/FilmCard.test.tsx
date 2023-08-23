import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import FilmCard from './FilmCard';
import { filmAPI } from 'api/film-api';
import { setupStore } from '../../store';
import { CounterProps } from '../FilmCard/helpers';
import mockFilmsData from '../FilmsContainer/films-data.json';
import {
  BASE_URL_WITH_ENDPOINT,
  REQUESTED_NUMBER_OF_FILMS,
} from 'constants/constants';

const server = setupServer(
  rest.get(BASE_URL_WITH_ENDPOINT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockFilmsData));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockOnCounterClick = (comand: CounterProps['comand']) => comand;

function wrapper({ children }: any) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}

function RenderFilmCard() {
  const { data: films } = filmAPI.useFetchAllFilmsQuery(
    REQUESTED_NUMBER_OF_FILMS
  );

  if (!films) {
    return null;
  }
  return (
    <FilmCard
      film={films[0]}
      dataTestId="filmCard"
      counter={mockOnCounterClick}
    />
  );
}

describe('<FilmCard />', () => {
  const likeButtonTestId = 'likeButton';
  const deleteButtonTestId = 'deleteButton';

  it('should be rendered without errors', () => {
    expect(() => render(<RenderFilmCard />, { wrapper })).not.toThrow();
  });

  it('should be rendered fields: name, sourceUrl, url', async () => {
    render(<RenderFilmCard />, { wrapper });
    const mockFilm = mockFilmsData.data[0];

    expect(await screen.findByText(mockFilm.name)).toBeInTheDocument();
    expect(await screen.findByText(mockFilm.sourceUrl)).toBeInTheDocument();
    expect(await screen.findByText(mockFilm.url)).toBeInTheDocument();
  });

  it('should contains like button', async () => {
    render(<RenderFilmCard />, { wrapper });
    expect(await screen.findByTestId(likeButtonTestId)).toBeInTheDocument();
  });

  it('should contains delete button', async () => {
    render(<RenderFilmCard />, { wrapper });
    expect(await screen.findByTestId(deleteButtonTestId)).toBeInTheDocument();
  });

  it('should change class like button after click', async () => {
    render(<RenderFilmCard />, { wrapper });
    const likeButton = await screen.findByTestId(likeButtonTestId);

    expect(likeButton).toHaveClass('unLiked');

    fireEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass('isLiked'));

    fireEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass('unLiked'));
  });

  it('should remove the movie after click on the delete button', async () => {
    render(<RenderFilmCard />, { wrapper });
    const mockFilm = mockFilmsData.data[0];
    await screen.findByText(mockFilm.name);

    const deleteButton = await screen.findByTestId(deleteButtonTestId);

    fireEvent.click(deleteButton);
    expect(screen.queryByText(mockFilm.name)).not.toBeInTheDocument();
  });
});
