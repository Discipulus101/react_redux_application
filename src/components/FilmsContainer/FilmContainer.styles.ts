import { styled } from 'styled-components';
import { media } from '../../constants/breakpoints';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  gap: 30px;
  padding: 64px 20px;
  box-sizing: border-box;

  ${media.tablet} {
    padding: 64px 72px;
  }
`;
