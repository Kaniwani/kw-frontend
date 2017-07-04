import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'components/IconButton';

LockButton.propTypes = {
  isActionable: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  level: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

LockButton.defaultProps = {
  size: '1.5em',
};

function LockButton({ level, isSubmitting, isActionable, isLocked, handleClick, ...props }) {
  let title = 'Level unavailable';
  let icon = 'LOCK_SOLID';
  if (isSubmitting) {
    icon = 'SYNC';
    title = 'Submitting';
  } else if (isActionable) {
    icon = isLocked ? 'LOCK_CLOSED' : 'LOCK_OPEN';
    title = isLocked ? `Unlock level ${level}` : `Lock level ${level}`;
  }

  return (
    <IconButton
      name={icon}
      title={title}
      disabled={!isActionable}
      handleClick={handleClick}
      {...props}
    />
  );
}

export default LockButton;
