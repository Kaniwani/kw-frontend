import React from 'react';
import PropTypes from 'prop-types';

import H5 from 'base/H5';
import Element from 'base/Element';

CriticalStatus.propTypes = {
  isCritical: PropTypes.bool.isRequired,
};

function CriticalStatus({ isCritical }) {
  return isCritical && <Element><H5>Critical!</H5></Element>;
}

export default CriticalStatus;
