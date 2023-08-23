import { styled } from 'styled-components';
import { media } from '../../constants/breakpoints';
import { IconButton } from '@alfalab/core-components/icon-button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px solid;
  border-radius: 20px;
  padding: 10px;

  ${media.laptop} {
    flex-direction: row;
    width: 839px;
  }
`;

export const ButtonBlock = styled.div`
  display: flex;
  gap: 10px;
  height: fit-content;
  margin-top: 30px;

  ${media.laptop} {
    max-width: 20%;
    margin-left: auto;
    margin-top: 0px;
  }
`;

export const ImgBlock = styled.div`
  ${media.laptop} {
    max-width: 30%;
  }
`;

export const TextBlock = styled.div`
  max-width: 100%;
  margin-top: 30px;
  word-wrap: break-word;

  ${media.laptop} {
    max-width: 50%;
    margin-left: 15px;
    margin-top: 0px;
  }
`;

export const ImgWrapper = styled.div<{ url: string }>`
  width: 200px;
  height: 200px;
  margin: 4px;
  cursor: pointer;
  background-size: cover;
  background-image: ${({ url }): string => `url(${url})`};
  background-position: center;
`;

export const StyledIconButton = styled(IconButton)`
  border: 1px solid var(--color-dark-bg-quaternary-inverted);

  &.isLiked {
    background-color: var(--color-static-graphic-salomie);
  }

  &.unLiked {
    background-color: var(--button-secondary-base-bg-color);
  }
`;
