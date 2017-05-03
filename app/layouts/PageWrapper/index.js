import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

PageWrapper.propTypes = {
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

PageWrapper.defaultProps = {
  tag: 'div',
  fullWidth: false,
  fullWidthBg: false,
};

function PageWrapper({ tag, children, fullWidth, fullWidthBg }) {
  return (
    <Wrapper
      tag={tag}
      fullWidth={fullWidth}
      fullWidthBg={fullWidthBg}
    >
      {children}
    </Wrapper>
  );
}

export default PageWrapper;
