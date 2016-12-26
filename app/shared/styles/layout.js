import { css } from 'styled-components';
import { gutter, siteMaxWidth } from './sizing';

/**
 * Allows background to be 100% width whilst content is contained and centered
 */
export const centerByPadding = css`
  padding-left: calc(50% - ${siteMaxWidth});
  padding-right: calc(50% - ${siteMaxWidth});
`;

export const centerByMargin = css`
  max-width: ${siteMaxWidth};
  margin-left: auto;
  margin-right: auto;
`;

export const wrapperGutter = css`
  padding: ${gutter / 2}rem;
`;

export const elementGutter = css`
  padding: ${gutter / 2}rem;
`;
