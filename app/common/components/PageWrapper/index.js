import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

PageWrapper.propTypes = {
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
};

PageWrapper.defaultProps = {
  fullWidth: false,
  fullWidthBg: false,
};

function PageWrapper({ fullWidth, fullWidthBg, ...props }) {
  return (
    <Wrapper fullWidth={fullWidth} fullWidthBg={fullWidthBg} {...props} />
  );
}

export default PageWrapper;
