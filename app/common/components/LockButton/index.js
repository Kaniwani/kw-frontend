import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'common/components/IconButton';

LockButton.propTypes = {
  size: PropTypes.string,
  isActionable: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isLocked: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

LockButton.defaultProps = {
  size: '1.5em',
  isActionable: true,
  isSubmitting: false,
  isLocked: false,
  children: false,
};

function LockButton({
  isSubmitting, isActionable, isLocked, children, ...props
}) {
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
      {...props}
    >
      {children}
    </IconButton>
  );
}

export default LockButton;
