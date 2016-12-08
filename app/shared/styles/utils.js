import { css } from 'styled-components';
import { units } from './spacing';
import { media } from './media';

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

export const sectionSpacing = css`
  margin-top: ${units.md};
  margin-bottom: ${units.md};

  ${media('min').lg`
    margin-top: ${units.lg};
    margin-bottom: ${units.lg};
  `}
`;

export const sectionGutters = css`
  max-width: ${units.siteMaxWidth};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${units.sm};
  padding-right: ${units.sm};

  ${media('min').md`
    padding-left: ${units.md};
    padding-right: ${units.md};
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
