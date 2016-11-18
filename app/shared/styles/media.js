import { css } from 'styled-components';

// these sizes are arbitrary and you can set them to whatever you wish
export const sizes = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 2000,
};

// iterate through the sizes and create a media template
export const media = (direction) => Object.keys(sizes).reduce((accumulator, label) => {
  const acc = accumulator;
  acc[label] = (...args) => css`
    @media (${direction}-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
