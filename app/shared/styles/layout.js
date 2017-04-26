import { padding, siteMaxWidthpx } from './sizing';
import { media } from './media';

/**
 * Allows background to be 100% width whilst content is contained and centered
 */
export const centerByPadding = `
  padding-left: calc(50% - ${siteMaxWidthpx});
  padding-right: calc(50% - ${siteMaxWidthpx});
`;

export const centerByMargin = `
  width: 100%;
  max-width: ${siteMaxWidthpx};
  margin-left: auto;
  margin-right: auto;
`;

export const containerGutter = `
  padding: ${padding.mobile.outer.y}rem ${padding.mobile.outer.x}rem;
  ${media('min').sm`
    padding: ${padding.desktop.outer.y}rem ${padding.desktop.outer.x}rem;
  `}
`;

export const elementGutter = `
  padding: ${padding.mobile.inner.y}rem ${padding.mobile.inner.x}rem;
  ${media('min').sm`
    padding: ${padding.desktop.inner.y}rem ${padding.desktop.inner.x}rem;
  `}
`;

export const containerGutterHorizontal = `
  padding-left: ${padding.mobile.outer.x}rem;
  padding-right: ${padding.mobile.outer.x}rem;
  ${media('min').sm`
    padding-left: ${padding.desktop.outer.x}rem;
    padding-right: ${padding.desktop.outer.x}rem;
  `}
`;

export const elementGutterHorizontal = `
  padding-left: ${padding.mobile.inner.x}rem;
  padding-right: ${padding.mobile.inner.x}rem;
  ${media('min').sm`
    padding-left: ${padding.desktop.inner.x}rem;
    padding-right: ${padding.desktop.inner.x}rem;
  `}
`;

export const containerGutterVertical = `
  padding-top: ${padding.mobile.outer.y}rem;
  padding-bottom: ${padding.mobile.outer.y}rem;
  ${media('min').sm`
    padding-top: ${padding.desktop.outer.y}rem;
    padding-bottom: ${padding.desktop.outer.y}rem;
  `}
`;

export const elementGutterVertical = `
  padding-top: ${padding.mobile.inner.y}rem;
  padding-bottom: ${padding.mobile.inner.y}rem;
  ${media('min').sm`
    padding-top: ${padding.desktop.inner.y}rem;
    padding-bottom: ${padding.desktop.inner.y}rem;
  `}
`;

/**
 * Uses negative margins to remove top and side padding (for a full width banner effect)
 * Uses half paddings to align side gutters with other sibling elements still
 */
export const bannerElement = `
  overflow-x: hidden;
  margin: -${padding.mobile.outer.y}rem -${padding.mobile.outer.x}rem 0;
  padding: 0 ${padding.mobile.inner.y}rem ${padding.mobile.inner.y}rem;
  ${media('min').sm`
    margin: -${padding.desktop.outer.y}rem -${padding.desktop.outer.x}rem 0;
    padding: 0 ${padding.desktop.inner.y}rem ${padding.desktop.inner.y}rem;
  `}
`;

/**
 * styled-components mixins, expecting `props` as argument
 */

export const fullRowMixin = ({ fullRow }) => fullRow ? bannerElement : elementGutter;
export const textAlignMixin = ({ textAlign }) => textAlign && `text-align: ${textAlign};`;
export const flexCenterMixin = ({ flexCenter }) => flexCenter && `
  justify-content: center;
  align-content: center;
  align-items: center;
`;
export const justifyContentMixin = ({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`;
export const alignContentMixin = ({ alignContent }) => alignContent && `align-content: ${alignContent};`;
export const alignItemsMixin = ({ alignItems }) => alignItems && `align-items: ${alignItems};`;
export const alignSelfMixin = ({ alignSelf }) => alignSelf && `align-self:${alignSelf};`;
export const flexShorthandMixin = ({ flex }) => flex && `flex:${flex};`;
export const flexMixin = ({ flexDisplay, flexRow, flexCol, flexWrap }) => (flexRow || flexCol) && `
  display: ${flexDisplay || 'flex'};
  flex-flow: ${(flexRow && 'row') || 'column'} ${(flexWrap && 'wrap') || ''};
`;
