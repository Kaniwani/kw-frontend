import { css } from 'styled-components';
import { units } from './spacing';
import { media } from './media';

const sectionSpacing = css`
  margin-top: ${units.md};
  margin-bottom: ${units.md};

  ${media('min').lg`
    margin-top: ${units.lg};
    margin-bottom: ${units.lg};
  `}
`;

const sectionGutters = css`
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

const clearfix = `
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const wordwrap = `
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;

const flexcenter = `
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const visuallyhidden = `
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

const resetList = `
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

const resetButton = `
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

const hidden = `
  display: none !important;
`;

/* hidden but still takes up space, used with icons generally */
const ghost = `
  opacity: 0 !important;
  pointer-events: none !important;
  cursor: none !important;
`;

export {
  sectionSpacing,
  sectionGutters,
  clearfix,
  wordwrap,
  flexcenter,
  visuallyhidden,
  resetList,
  resetButton,
  hidden,
  ghost,
};

