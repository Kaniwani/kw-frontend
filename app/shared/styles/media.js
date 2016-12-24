import { css } from 'styled-components';

/**
 * Sizes for media queries using media tag
 * IE: media('min').xl`css: rule;`;
 * @type {Object}
 */
export const sizes = {
  xs: 400,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
};

/**
 * Returns css wrappen in a given media query
 * usage with styled-components:
 * media.sm`color: red;`;
 * @param  {String} direction 'min' or 'max' to apply min-width or max-width
 * @return {String} css wrapped in media query
 */
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
