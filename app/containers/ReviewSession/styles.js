import styled from 'styled-components';
import { white, reviewBackground } from 'shared/styles/colors';
import bg from 'shared/assets/img/reviews.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(${reviewBackground});
`;

export const Upper = styled.section`
  display: flex;
  flex-direction: column;
  padding: .5rem .6rem;
  min-height: 33vh;
  background-color: #6a3bbc;
  background-image: linear-gradient(180deg, #774ac6, #5f35a9);
  background-repeat: repeat-x;
  color: rgb(${white});
`;

export const Lower = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  background-color: rgb(${reviewBackground});
`;

export const ReviewBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: .9;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  align-self: stretch;
  height: 100%;
  max-height: 25vmax;
`;
