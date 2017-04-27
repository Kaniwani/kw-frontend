import React from 'react';
import PropTypes from 'prop-types';

import { StyledP } from './styles';

P.propTypes = {
  children: PropTypes.node.isRequired,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

P.defaultProps = {
  textAlign: 'left',
  align: 'left',
};

function P({ children, textAlign, align }) {
  return (
    <StyledP textAlign={textAlign} align={align}>
      {children}
    </StyledP>
  );
}

export default P;
