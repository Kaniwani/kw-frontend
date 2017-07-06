import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { white } from 'shared/styles/colors';
import BackgroundImg from 'components/BackgroundImg';
// match review background image svg color
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
  ${gutter({ position: 'horizontal' })}
  ${gutter({ position: 'top', mod: 1.5 })} /* Space for progress bar */
  ${gutter({ position: 'bottom', mod: 0.25 })} /* Taglist has enough already*/
  display: flex;
  flex-direction: column;
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

export const ReviewBackgroundImg = BackgroundImg.extend`
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  max-height: 25vmax;
  opacity: .9;
  z-index: 0;
  background-position: bottom right;
`;
