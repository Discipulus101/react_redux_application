import { FC, ReactNode, useState } from 'react';
import { Button } from '@alfalab/core-components/button';
import { Spinner } from '@alfalab/core-components/spinner';
import { filmAPI } from '../../api/film-api';
import { FilmData } from '../../models/models';
import FilmCard from '../FilmCard/FilmCard';
import { Wrapper } from './FilmContainer.styles';
import { REQUESTED_NUMBER_OF_FILMS } from '../../constants/constants';
import { CounterProps } from '../FilmCard/helpers';

const FilmContainer: FC = () => {
  const [isLikedShow, setIsLikedShow] = useState(false);
  const [likedCounter, setLikedCounter] = useState(0);

  const {
    data: films,
    isLoading,
    error,
  } = filmAPI.useFetchAllFilmsQuery(REQUESTED_NUMBER_OF_FILMS);

  function onCounterClick(comand: CounterProps['comand']) {
    if (comand === 'up') {
      setLikedCounter(likedCounter + 1);
    } else {
      setLikedCounter(likedCounter - 1);
    }
  }

  const getLikedFilms = (films: FilmData[]) =>
    films.filter((film: FilmData) => film.isLiked);

  const renderFilmsList = (films: FilmData[]): ReactNode =>
    films?.map((film: FilmData) => (
      <FilmCard
        dataTestId="filmCard"
        key={film._id}
        film={film}
        counter={onCounterClick}
      />
    ));

  if (error) {
    return <Wrapper>error</Wrapper>;
  }
  if (isLoading) {
    return (
      <Wrapper>
        <Spinner visible size="m" dataTestId="spinner" />
      </Wrapper>
    );
  }
  if (!films?.length) {
    return <Wrapper>Карточек нет</Wrapper>;
  }

  return (
    <Wrapper>
      <Button
        view="secondary"
        size="xs"
        onClick={() => setIsLikedShow(!isLikedShow)}
        disabled={!likedCounter && !isLikedShow}
        dataTestId="likedShowButton"
      >
        {isLikedShow
          ? 'Показать все карточки'
          : 'Показать карточки имеющие лайк'}
      </Button>

      {!isLikedShow && renderFilmsList(films)}

      {isLikedShow && renderFilmsList(getLikedFilms(films))}
    </Wrapper>
  );
};

export default FilmContainer;
