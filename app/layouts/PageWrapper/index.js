import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

PageWrapper.propTypes = {
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

PageWrapper.defaultProps = {
  fullWidth: false,
  fullWidthBg: false,
};

function PageWrapper({ fullWidth, fullWidthBg, children, ...props }) {
  return (
    <Wrapper fullWidth={fullWidth} fullWidthBg={fullWidthBg} {...props}>
      {children}
    </Wrapper>
  );
}

export default PageWrapper;
