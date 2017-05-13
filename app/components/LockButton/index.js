import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'components/IconButton';

LockButton.propTypes = {
  title: PropTypes.string.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
};

LockButton.defaultProps = {
  color: 'currentColor',
  size: '1.5em',
};

function LockButton({ title, isActionable, isLocked, ...props }) {
  let icon = 'LOCK_SOLID';
  if (isActionable) {
    icon = isLocked ? 'LOCK_CLOSED' : 'LOCK_OPEN';
  }
  return (
    <IconButton
      name={icon}
      title={title}
      disabled={!isActionable}
      {...props}
    />
  );
}

export default LockButton;
