import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'common/components/Button';
import Icon from 'common/components/Icon';
import { gutter } from 'common/styles/layout';
import { white, grey } from 'common/styles/colors';

// prettier-ignore
export const Text = styled.div`
  /* slightly nicer centering otherwise too far left due to button min-width & 2 char text */
  ${gutter({ position: 'left', mod: 1.5 })}
  ${gutter({ position: 'right', mod: 2 })}
`;

function VocabResetButton({ disabled, onClick }) {
  return (
    <Button
      title="Reset SRS"
      plainButton={false}
      disabled={disabled}
      color={white[2]}
      colorHover={grey[4]}
      bgColor={grey[4]}
      bgColorHover={white[2]}
      onClick={onClick}
    >
      <Text>Reset SRS</Text>
      <Icon size="1.25em" name="RESTART" />
    </Button>
  );
}

VocabResetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default VocabResetButton;
