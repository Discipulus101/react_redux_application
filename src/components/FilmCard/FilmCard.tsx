import { FC, useState } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import { Gallery } from '@alfalab/core-components/gallery';
import { StyledIconButton } from './FilmCard.styles';
import { Button } from '@alfalab/core-components/button';
import { Gap } from '@alfalab/core-components/gap';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { useAppDispatch } from '../../hooks/--use-dispatch';
import { filmAPI } from '../../api/film-api';
import { FilmData } from '../../models/models';
import { REQUESTED_NUMBER_OF_FILMS } from '../../constants/constants';
import { keysToRender, CounterProps } from './helpers';
import {
  Wrapper,
  ButtonBlock,
  ImgBlock,
  TextBlock,
  ImgWrapper,
} from './FilmCard.styles';

interface Props {
  film: FilmData;
  counter: (comand: CounterProps['comand']) => void;
  dataTestId?: string;
}

const FilmCard: FC<Props> = ({ film, counter, dataTestId }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const openGallery = () => {
    setOpen(true);
  };

  const closeGallery = () => {
    setOpen(false);
  };

  const images = [
    {
      name: film.name,
      src: film.imageUrl,
    },
  ];

  function handleLikeClick(id: number, isLiked: boolean) {
    counter(isLiked ? 'down' : 'up');

    dispatch(
      filmAPI.util.updateQueryData(
        'fetchAllFilms',
        REQUESTED_NUMBER_OF_FILMS,
        (draftFilms: FilmData[]) => {
          const result = draftFilms.filter((film) => film._id === id);
          result[0].isLiked = !result[0].isLiked;
        }
      )
    );
  }

  function handleClickDelete(id: number, isLiked: boolean) {
    if (isLiked) {
      counter('down');
    }

    dispatch(
      filmAPI.util.updateQueryData(
        'fetchAllFilms',
        REQUESTED_NUMBER_OF_FILMS,
        (draftFilms: FilmData[]) => {
          return draftFilms.filter((film) => film._id !== id);
        }
      )
    );
  }

  const getContent = (film: FilmData) => {
    const content = [];

    for (const key of keysToRender) {
      const value = film[key];

      if (Array.isArray(value) && value.length > 0) {
        content.push(
          <div key={key}>
            <Typography.Text>
              <Typography.Text weight="bold">{key}:</Typography.Text>
              {value.map((textItem) => {
                return <div key={textItem}> {textItem}</div>;
              })}
            </Typography.Text>
            <Gap size="s" />
          </div>
        );
      }
      if (typeof value === 'string') {
        content.push(
          <div key={key}>
            <Typography.Text key={key}>
              <Typography.Text weight="bold">{key}:</Typography.Text> {value}
            </Typography.Text>
            <Gap size="s" />
          </div>
        );
      }
    }

    return content;
  };

  return (
    <Wrapper data-test-id={dataTestId}>
      <ImgBlock>
        <ImgWrapper
          url={film.imageUrl}
          key={film.imageUrl}
          onClick={() => {
            openGallery();
          }}
        />
        <Gallery open={open} onClose={closeGallery} images={images} />
      </ImgBlock>

      <TextBlock>{getContent(film)}</TextBlock>

      <ButtonBlock>
        <StyledIconButton
          view="primary"
          size="xs"
          icon={StarMIcon}
          className={film.isLiked ? 'isLiked' : 'unLiked'}
          onClick={() => handleLikeClick(film._id, film.isLiked)}
          dataTestId="likeButton"
        />

        <Button
          view="secondary"
          size="xs"
          onClick={() => handleClickDelete(film._id, film.isLiked)}
          dataTestId="deleteButton"
        >
          Удалить
        </Button>
      </ButtonBlock>
    </Wrapper>
  );
};

export default FilmCard;
