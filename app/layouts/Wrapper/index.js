import React from 'react';
import PropTypes from 'prop-types';

import { StyledWrapper } from './styles';

Wrapper.propTypes = {
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

Wrapper.defaultProps = {
  tag: 'div',
  fullWidth: false,
  fullWidthBg: false,
};

function Wrapper({ tag, children, fullWidth, fullWidthBg }) {
  return (
    <StyledWrapper
      tag={tag}
      fullWidth={fullWidth}
      fullWidthBg={fullWidthBg}
    >
      {children}
    </StyledWrapper>
  );
}

export default Wrapper;
