import { css } from 'styled-components';

/**
 * Sizes for media queries using media tag
 * IE: media('max').sm` css: rule; `;
 * @type {Object}
 */
export const breakpoints = {
  xs: 400,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
};

/**
 * Returns css wrapped in a given media query
 * usage with styled-components:
 * media().sm`color: red;`;
 * @param  {String} [limit='min'] 'min' or 'max' to apply min-width or max-width
 * @return {String} css wrapped in media query
 */
export const media = (limit = 'min') => Object.keys(breakpoints).reduce((accumulator, label) => {
  const acc = accumulator;
  acc[label] = (...args) => {
    let size = breakpoints[label];
    // to ensure (max-width: 599px) versus (min-width: 600px) [the next size up]
    if (limit === 'max') size -= 1;

    return css`
      @media (${limit}-width: ${size}px) {
        ${css(...args)}
      }`;
  };
  return acc;
}, {});
