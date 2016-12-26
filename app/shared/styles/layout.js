import { padding, siteMaxWidthpx } from './sizing';

/**
 * Allows background to be 100% width whilst content is contained and centered
 */
export const centerByPadding = `
  padding-left: calc(50% - ${siteMaxWidthpx});
  padding-right: calc(50% - ${siteMaxWidthpx});
`;

export const fullRowElement = `
  overflow-x: hidden;
  margin: 0 -${padding.outer.x}rem;
  padding: ${padding.inner.y / 2}rem ${(padding.inner.x / 2) + padding.outer.x}rem;
`;

export const centerByMargin = `
  max-width: ${siteMaxWidthpx};
  margin-left: auto;
  margin-right: auto;
`;

export const wrapperGutter = `
  padding: ${padding.outer.y / 2}rem ${padding.outer.x / 2}rem;
`;

export const elementGutter = `
  padding: ${padding.inner.y / 2}rem ${padding.inner.x / 2}rem;
`;
