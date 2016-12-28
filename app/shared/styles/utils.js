import { css } from 'styled-components';
import { convert } from 'css-color-function'; // https://github.com/postcss/postcss-color-function

/**
 * Returns fallback, and media queried calc() font-sizes for responsive sizing
 * based on https://madebymike.com.au/writing/precise-control-responsive-typography/
 * @param  {Number} [minFont] Minimum font-size (px)
 * @param  {Number} [maxFont] Maximum font-size (px)
 * @param  {Number} [minWidth:600] Minimum viewport size to begin scaling (px)
 * @param  {Number} [maxWidth:1280] Maximum viewport size to halt scaling (px)
 * @return {String} CSS font-size rules
 */
export function fluidType(minFont, maxFont, minWidth = 600, maxWidth = 1280) {
  return `
    font-size: ${minFont}px;
    @media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
      font-size: calc(${minFont}px + (${maxFont} - ${minFont}) * ( (100vw - ${minWidth}px) / ( ${maxWidth} - ${minWidth}) ));
    }
    @media (min-width: ${maxWidth}px) {
      font-size: ${maxFont}px;
    }
  `;
}

/**
 * Sets left and right values based on position prop string: 'left' or 'right';
 * @param {any} left  Value to set if this.props.position is 'left'
 * @param {any} right  Value to set if this.props.position is 'right'
 * @param {any} fallback  Value to set if this.props.position is neither left nor right
 * @return {Function} Function waiting to receive `this.props`
 */
export const setLeftRight = (left, right, fallback) => ({ position }) => {
  if (position === 'left') return left;
  if (position === 'right') return right;
  return fallback;
};


/**
 * Creates a background gradient shiftin between x% of a given color
 * @param  {String} [initialColor='grey'] Color to blend between
 * @param  {String} [direction='bottom'] Direction of gradient
 * @param  {Number} [percent=20] Color change between points
 * @return {String} CSS background rules
 */
export function bgGradient(initialColor = 'grey', direction = 'bottom', percent = 5) {
  // using css-color-function to reach parity with future css
  const fromColor = convert(`color(${initialColor} lightness(+ ${percent}%))`);
  const toColor = convert(`color(${initialColor} lightness(- ${percent}%))`);

  return css`
    background-color: ${initialColor}; /* fallback */
    background-image: linear-gradient(to ${direction}, ${fromColor}, ${toColor});
    background-repeat: repeat-x;
  `;
}

/* increases clickable/hoverable/tappable area for element without increasing size visually or adding internal padding */
export const tapTarget = ({ x, y } = { x: '.1rem', y: '.1rem' }) => css`
  &:after {
    position: absolute;
    content: "";
    top: -${y};
    right: -${x};
    bottom: -${y};
    left: -${x};
  }
`;

export const clearfix = css`
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const wordwrap = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;

export const visuallyhidden = css`
  position: absolute;
  height: 1px !important;
  width: 1px !important;
  margin: -1px !important;
  clip: rect(0 0 0 0);
  outline: 0;
  overflow: hidden;
  border: 0;
  padding: 0;
  line-height: 0;
`;

export const resetList = css`
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

export const resetButton = css`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-appearance: button;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &::-moz-focus-inner,
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

export const hidden = css`
  display: none !important;
`;

/* hidden but still takes up space, to be used with inline icons generally */
export const ghost = css`
  opacity: 0 !important;
  pointer-events: none !important;
  cursor: none !important;
`;
