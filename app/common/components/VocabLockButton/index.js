import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'common/components/Button';
import Icon from 'common/components/Icon';
import { gutter } from 'common/styles/layout';

// prettier-ignore
export const Text = styled.div`
  /* slightly nicer centering otherwise too far left due to button min-width & 2 char text */
  ${gutter({ position: 'left', mod: 1.5 })}
  ${gutter({ position: 'right', mod: 2 })}
`;

import { white, grey } from 'common/styles/colors';

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
  const text = `${isLocked ? 'Enable' : 'Suspend'} Review`;

  return (
    <Button
      title={text}
      plainButton={false}
      color={white[2]}
      colorHover={grey[4]}
      bgColor={grey[4]}
      bgColorHover={white[2]}
      onClick={onClick}
      isSubmitting={isSubmitting}
    >
      <Text>{text}</Text>
      <Icon name={icon} />
    </Button>
  );
}

export default VocabLockButton;
