import React from "react";
import PropTypes from "prop-types";

import IconButton from 'common/components/IconButton';

import { grey } from "common/styles/colors";

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
  const icon = isLocked ? "LOCK_CLOSED" : "LOCK_OPEN";
  const text = `${isLocked ? "Unlock" : "Lock"} Review`;

  return (
    <IconButton
      inline
      text={text}
      name={icon}
      title={text}
      plainButton={false}
      bgColor={grey}
      colorHover={grey}
      onClick={onClick}
      isSubmitting={isSubmitting}
      data-ignore-hotkeys
    />
  );
}

// TODO: select hidden, lock/unlock dispatch from connect - only need to pass review id

export default VocabLockButton;
