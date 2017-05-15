import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'components/IconButton';

LockButton.propTypes = {
  title: PropTypes.string.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  size: PropTypes.string,
};

LockButton.defaultProps = {
  size: '1.5em',
};

function LockButton({ title, isActionable, isLocked, ...props }) {
  let icon = 'LOCK_SOLID';
  let iconColor = 'grey';
  if (isActionable) {
    icon = isLocked ? 'LOCK_CLOSED' : 'LOCK_OPEN';
    iconColor = isLocked ? 'grey' : 'greyLight';
  }

  return (
    <IconButton
      name={icon}
      title={title}
      color={iconColor}
      disabled={!isActionable}
      {...props}
    />
  );
}

export default LockButton;
