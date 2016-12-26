import { gutter, siteMaxWidthpx } from './sizing';

/**
 * Allows background to be 100% width whilst content is contained and centered
 */
export const centerByPadding = `
  padding-left: calc(50% - ${siteMaxWidthpx});
  padding-right: calc(50% - ${siteMaxWidthpx});
`;

export const centerByMargin = `
  max-width: ${siteMaxWidthpx};
  margin-left: auto;
  margin-right: auto;
`;

export const wrapperGutter = `
  padding: ${gutter / 2}rem;
`;

export const elementGutter = `
  padding: ${gutter / 2}rem;
`;
