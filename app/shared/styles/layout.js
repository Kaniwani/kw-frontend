import { padding, siteMaxWidthpx } from './sizing';
import { media } from './media';
import { css } from 'styled-components';
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

export const containerGutter = css`
  padding: ${padding.mobile.outer.y / 2}rem ${padding.mobile.outer.x / 2}rem;
  ${media('min').sm`
    padding: ${padding.desktop.outer.y / 2}rem ${padding.desktop.outer.x / 2}rem;
  `}
`;

export const elementGutter = css`
  padding: ${padding.mobile.inner.y / 2}rem ${padding.mobile.inner.x / 2}rem;
  ${media('min').sm`
    padding: ${padding.desktop.inner.y / 2}rem ${padding.desktop.inner.x / 2}rem;
  `}
`;

/**
 * Uses negative margins to remove top and side padding (for a full width banner effect)
 * Uses half paddings to align side gutters with other sibling elements still
 */
export const bannerElement = css`
  overflow-x: hidden;
  margin: -${padding.mobile.outer.y / 2}rem -${padding.mobile.outer.x / 2}rem 0;
  padding: 0 ${padding.mobile.inner.y / 2}rem ${padding.mobile.inner.y / 2}rem;
  ${media('min').sm`
    margin: -${padding.desktop.outer.y / 2}rem -${padding.desktop.outer.x / 2}rem 0;
    padding: 0 ${padding.desktop.inner.y / 2}rem ${padding.desktop.inner.y / 2}rem;
  `}
`;
