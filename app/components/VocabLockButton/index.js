import React from "react";
import PropTypes from "prop-types";

import IconButton from 'components/IconButton';

import { grey } from "shared/styles/colors";

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

export default VocabLockButton;
