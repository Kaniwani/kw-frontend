import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import backgroundImage from 'shared/assets/img/reviews.svg';
// matches review background image svg color
export const backgroundImageColor = '#e5e5e5';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundImageColor};
  min-height: 100vh;
  width: 100%;
  padding-left: calc(50% - 2000px);
  padding-right: calc(50% - 2000px);
`;

export const Upper = styled.section`
  display: flex;
  flex-direction: column;
  padding: .4rem;
  min-height: 35vmin;
  background-color: #6a3bbc;
  background-image: linear-gradient(180deg, #774ac6, #5f35a9);
  background-repeat: repeat-x;
  color: ${white};
`;

export const Lower = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  background-color: ${backgroundImageColor};
`;

export const ReviewBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  opacity: .9;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  align-self: stretch;
  height: 100%;
  max-height: 25vmax;
`;
