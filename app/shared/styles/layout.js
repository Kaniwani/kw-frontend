import { gutters, siteMaxWidth, siteMaxWidthpx } from './sizing';
import { media } from './media';

/**
 * Allows background-image/color to be 100% width whilst content is contained and centered
 */
export const centerByPadding = `
  padding-left: calc(50vw - ${siteMaxWidth / 2}px);
  padding-right: calc(50vw - ${siteMaxWidth / 2}px);
`;

export const centerByMargin = `
  width: 100%;
  max-width: ${siteMaxWidthpx};
  margin-left: auto;
  margin-right: auto;
`;

const createGutter = (prop = 'padding', type = 'inner', mod = 1, position) => {
  const property = `${prop}${(position ? `-${position}` : '')}`;
  const mobile = `${gutters.mobile[type] * mod}rem`;
  const desktop = `${gutters.desktop[type] * mod}rem`;

  return `
    ${property}: ${mobile};
    ${media('min').sm`
      ${property}: ${desktop};
    `}
  `;
};

const createHorizontalGutters = (prop, type, mod) => `
  ${createGutter(prop, type, mod, 'left')}
  ${createGutter(prop, type, mod, 'right')}
`;

const createVerticalGutters = (prop, type, mod) => `
  ${createGutter(prop, type, mod, 'top')}
  ${createGutter(prop, type, mod, 'bottom')}
`;

export const gutter = ({
  prop = 'padding',
  position,
  type = 'inner',
  mod = 1,
} = {}) => {
  switch (position) {
    case 'horizontal': return createHorizontalGutters(prop, type, mod);
    case 'vertical': return createVerticalGutters(prop, type, mod);
    case 'all': return createGutter(prop, type, mod);
    default: return createGutter(prop, type, mod, position);
  }
};

/**
 * Uses negative margins to remove top and side padding (for a full width banner effect)
 * Uses half paddings to align side gutters with other sibling elements still
 */
export const bannerElement = `
  overflow-x: hidden;
  margin: -${gutters.mobile.outer}rem -${gutters.mobile.outer}rem 0;
  padding: 0 ${gutters.mobile.inner}rem ${gutters.mobile.inner}rem;
  ${media('min').sm`
    margin: -${gutters.desktop.outer}rem -${gutters.desktop.outer}rem 0;
    padding: 0 ${gutters.desktop.inner}rem ${gutters.desktop.inner}rem;
  `}
`;

/**
 * styled-components mixins, expecting `props` as argument
 */

export const fullRowMixin = ({ fullRow }) => fullRow ? bannerElement : createGutter();
export const textAlignMixin = ({ textAlign }) => textAlign && `text-align: ${textAlign};`;
export const flexMixin = ({ flexDisplay, flexRow, flexColumn, flexWrap }) => (flexRow || flexColumn) && `
display: ${flexDisplay || 'flex'};
flex-flow: ${(flexRow && 'row') || 'column'} ${(flexWrap && 'wrap') || ''};
`;
export const flexCenterMixin = ({ flexCenter }) => flexCenter && `
  justify-content: center;
  align-content: center;
  align-items: center;
`;
export const flexShorthandMixin = ({ flex }) => flex && `flex:${flex};`;
export const justifyContentMixin = ({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`;
export const alignContentMixin = ({ alignContent }) => alignContent && `align-content: ${alignContent};`;
export const alignItemsMixin = ({ alignItems }) => alignItems && `align-items: ${alignItems};`;
export const alignSelfMixin = ({ alignSelf }) => alignSelf && `align-self:${alignSelf};`;
