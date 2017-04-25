import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';

P.propTypes = {
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

P.defaultProps = {
  textAlign: 'left',
  align: 'left',
};

const StyledP = styled.p`
  max-width: 35em; /* constrain line-length to ~70 chars */
  ${epsilon}
  text-align: ${({ textAlign }) => textAlign};
  margin-left: ${({ align }) => align === 'center' ? 'auto' : 0};
  margin-right: ${({ align }) => align === 'center' ? 'auto' : 0};
  ${bodyRhythm}
`;

function P({ textAlign, align, ...props }) {
  return <StyledP textAlign={textAlign} align={align} {...props} />;
}

export default P;
