import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  alignContentMixin,
  alignItemsMixin,
  alignSelfMixin,
  containerGutter,
  flexCenterMixin,
  flexMixin,
  flexShorthandMixin,
  justifyContentMixin,
  textAlignMixin,
} from 'shared/styles/layout';

Container.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  withPadding: PropTypes.bool,
  marginTop: PropTypes.string,
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignSelf: PropTypes.string,
  flex: PropTypes.string,
  flexCenter: PropTypes.bool,
  flexCol: PropTypes.bool,
  flexRow: PropTypes.bool,
  flexWrap: PropTypes.bool,
  justifyContent: PropTypes.string,
  textAlign: PropTypes.string,
};

Container.defaultProps = {
  tag: 'div',
  withPadding: true,
  marginTop: '',
  alignContent: '',
  alignItems: '',
  alignSelf: '',
  flex: '',
  flexCenter: false,
  flexCol: false,
  flexDisplay: '', // defaults to 'flex', alternative is to pass 'inline-flex'
  flexRow: false,
  flexWrap: false,
  justifyContent: '',
  textAlign: '',
};

const containerStyle = css`
  position: relative; /* catch any absolute children */
  ${({ withPadding }) => withPadding && containerGutter}
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`}
  ${flexMixin}
  ${flexCenterMixin}
  ${flexShorthandMixin}
  ${alignContentMixin}
  ${alignItemsMixin}
  ${alignSelfMixin}
  ${justifyContentMixin}
  ${textAlignMixin}
`;

/* eslint-disable no-unused-vars */
// A bit crazytown, but this way we can pass the tag as a prop to dynamically choose 'div', 'section', 'header' etc
const StyledContainer = styled(({
  tag,
  children,
  withPadding,
  marginTop,
  fullRow,
  flexRow,
  flexDisplay,
  flexCol,
  flexWrap,
  flexCenter,
  textAlign,
  justifyContent,
  alignContent,
  alignItems,
  flex,
  alignSelf,
 ...props
}) => React.createElement(tag, props, children))`${containerStyle}`;
/* eslint-enable */

function Container({ tag, children, ...props }) {
  return <StyledContainer tag={tag} {...props}>{children}</StyledContainer>;
}

export default Container;
