import { css } from 'styled-components';
import { unit } from './sizing';
import { media } from './media';
import { convert } from 'css-color-function'; // https://github.com/postcss/postcss-color-function

/**
 * Returns fallback, and media queried calc() font-sizes for responsive sizing
 * based on https://madebymike.com.au/writing/precise-control-responsive-typography/
 * @param  {Number} [minFont=12] Minimum font-size (px)
 * @param  {Number} [maxFont=21] Maximum font-size (px)
 * @param  {Number} [minWidth=420] Minimum viewport size to begin scaling (px)
 * @param  {Number} [maxWidth=1280] Maximum viewport size to halt scaling (px)
 * @return {String} CSS font-size rules
 */
export function fluidType(minFont = 12, maxFont = 21, minWidth = 420, maxWidth = 1280) {
  return css`
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

export const fullWidthBg = css`
  padding-left: calc(50% - ${unit.siteMaxWidth});
  padding-right: calc(50% - ${unit.siteMaxWidth});
`;

export const sectionSpacing = css`
  margin-top: ${unit.md};
  margin-bottom: ${unit.md};

  ${media('min').lg`
    margin-top: ${unit.lg};
    margin-bottom: ${unit.lg};
  `}
`;

export const sectionGutters = css`
  max-width: ${unit.siteMaxWidth};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${unit.sm};
  padding-right: ${unit.sm};

  ${media('min').md`
    padding-left: ${unit.md};
    padding-right: ${unit.md};
  `}
`;

export const clearfix = `
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const wordwrap = `
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;

export const flexcenter = `
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const visuallyhidden = `
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

export const resetList = `
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

export const resetButton = `
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

export const hidden = `
  display: none !important;
`;

/* hidden but still takes up space, used with icons generally */
export const ghost = `
  opacity: 0 !important;
  pointer-events: none !important;
  cursor: none !important;
`;
