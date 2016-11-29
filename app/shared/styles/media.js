import { css } from 'styled-components';

// these sizes are arbitrary and you can set them to whatever you wish
export const sizes = {
  xs: 400,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
};

// iterate through the sizes and create a media template
export const media = (direction) => Object.keys(sizes).reduce((accumulator, label) => {
  const acc = accumulator;
  acc[label] = (...args) => {
    let size = sizes[label];
    // to ensure (max-width: 599px) versus (min-width: 600px) [the next size up]
    if (direction === 'max') size -= 1;

    return css`
      @media (${direction}-width: ${size}px) {
        ${css(...args)}
      }`;
  };
  return acc;
}, {});
