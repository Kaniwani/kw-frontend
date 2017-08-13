import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'components/IconButton';

LockButton.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  size: PropTypes.string,
  isActionable: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isLocked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

LockButton.defaultProps = {
  size: '1.5em',
  isActionable: true,
  isSubmitting: false,
  isLocked: false,
  children: false,
};

function LockButton({ isSubmitting, isActionable, isLocked, onClick, children, ...props }) {
  let title = 'Not allowed';
  let icon = 'LOCK_SOLID';
  if (isSubmitting) {
    icon = 'SYNC';
    title = 'Syncing';
  } else if (isActionable) {
    icon = isLocked ? 'LOCK_CLOSED' : 'LOCK_OPEN';
    title = isLocked ? 'Unlock' : 'Lock';
  }

  return (
    <IconButton
      name={icon}
      title={title}
      disabled={!isActionable}
      onClick={onClick}
      {...props}
    >
      {children}
    </IconButton>
  );
}

export default LockButton;
