import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  alignContentMixin,
  alignItemsMixin,
  alignSelfMixin,
  flexCenterMixin,
  flexMixin,
  flexShorthandMixin,
  fullRowMixin,
  justifyContentMixin,
  textAlignMixin,
} from 'shared/styles/layout';

Element.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignSelf: PropTypes.string,
  flex: PropTypes.string,
  flexCenter: PropTypes.bool,
  flexCol: PropTypes.bool,
  flexDisplay: PropTypes.string,
  flexRow: PropTypes.bool,
  flexWrap: PropTypes.bool,
  fullRow: PropTypes.bool,
  justifyContent: PropTypes.string,
  textAlign: PropTypes.string,
};

Element.defaultProps = {
  tag: 'div',
  alignContent: '',
  alignItems: '',
  alignSelf: '',
  flex: '',
  flexCenter: false,
  flexCol: false,
  flexDisplay: '', // defaults to 'flex', alternative is to pass 'inline-flex'
  flexRow: false,
  flexWrap: false,
  fullRow: false,
  justifyContent: '',
  textAlign: '',
};

const elementStyle = css`
  ${fullRowMixin}
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
const StyledElement = styled(({
  tag,
  children,
  fullRow,
  flexDisplay,
  flexRow,
  flexCol,
  flexWrap,
  flexCenter,
  flex,
  textAlign,
  justifyContent,
  alignContent,
  alignItems,
  alignSelf,
 ...props }) => React.createElement(tag, props, children))`${elementStyle}`;
/* eslint-enable */

function Element({ tag, children, ...props }) {
  return (
    <StyledElement tag={tag} {...props}>
      {children}
    </StyledElement>
  );
}

export default Element;
