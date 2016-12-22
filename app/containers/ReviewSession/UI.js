import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import bg from 'shared/assets/img/backgrounds/reviews.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #e5e5e5; /* image bg color, not used anywhere else hence no imported var name */
`;

export const Upper = styled.section`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  background-color: #6a3bbc;
  background-image: linear-gradient(180deg, #774ac6, #5f35a9);
  background-repeat: repeat-x;
  color: rgb(${white});
`;

export const ReviewBackground = styled.div`
  flex: 1 0 100%;
  opacity: .9;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  margin-top: auto;
  max-height: 25vmax;
`;
