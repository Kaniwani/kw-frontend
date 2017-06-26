import { css } from 'styled-components';
import { lighten, darken } from 'polished';

/**
 * Returns fallback, and media queried calc() font-sizes for responsive sizing
 * based on https://madebymike.com.au/writing/precise-control-responsive-typography/
 * @param  {Number} minFont Minimum font-size (px)
 * @param  {Number} maxFont Maximum font-size (px)
 * @param  {Number} [minWidth=600] Minimum viewport size to begin scaling (px)
 * @param  {Number} [maxWidth=1280] Maximum viewport size to halt scaling (px)
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
 * Creates a background gradient shifting between x% of a given color
 * @param  {String} [initialColor='grey'] Color to blend between
 * @param  {String} [direction='bottom'] Direction of gradient
 * @param  {Number} [amount=0.5] Light/Dark color change between midpoint
 * @return {String} CSS background rules
 */
export function bgGradient(initialColor = 'grey', direction = 'bottom', amount = 0.5) {
  const fromColor = lighten(amount, initialColor);
  const toColor = darken(amount, initialColor);

  return css`
    background-color: ${initialColor}; /* fallback */
    background-image: linear-gradient(to ${direction}, ${fromColor}, ${toColor});
    background-repeat: repeat-x;
  `;
}

/**
 * Increases clickable/hoverable/tappable area for element
 * without increasing size visually or adding internal padding
 * @param  {Object} config - option config of {x:String, y:String} to set axis size
 * @return {String} css as string
 */
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

export const visuallyHidden = `
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
  appearance: none;
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

/* hidden but still takes up space, to be used with inline icons generally */
export const ghost = `
  opacity: 0 !important;
  pointer-events: none !important;
  cursor: none !important;
`;
