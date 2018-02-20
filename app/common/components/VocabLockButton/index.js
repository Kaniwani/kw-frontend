import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'common/components/IconButton';

import { grey } from 'common/styles/colors';

VocabLockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLocked: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

VocabLockButton.defaultProps = {
  isLocked: false,
  isSubmitting: false,
};

function VocabLockButton({ isLocked, isSubmitting, onClick }) {
  const icon = isLocked ? 'LOCK_CLOSED' : 'LOCK_OPEN';
  const text = `${isLocked ? 'Unlock' : 'Lock'} Review`;

  return (
    <IconButton
      inline
      text={text}
      name={icon}
      title={text}
      plainButton={false}
      bgColor={grey[5]}
      colorHover={grey[5]}
      onClick={onClick}
      isSubmitting={isSubmitting}
      data-ignore-hotkeys
    />
  );
}

export default VocabLockButton;
