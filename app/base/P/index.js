import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';

P.propTypes = {
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

P.defaultProps = {
  textAlign: 'left',
  align: 'left',
};

export const lineLengthMixin = css`
  max-width: 35em;
  margin-left: ${({ align }) => align === 'center' ? 'auto' : 0};
  margin-right: ${({ align }) => align === 'center' ? 'auto' : 0};
`;

const textAlignMixin = ({ textAlign }) => textAlign && `text-align: ${textAlign};`;

const StyledP = styled.p`
  ${epsilon}
  ${bodyRhythm}
  ${textAlignMixin}
  ${lineLengthMixin}
`;

function P({ textAlign, align, ...props }) {
  return <StyledP textAlign={textAlign} align={align} {...props} />;
}

export default P;
