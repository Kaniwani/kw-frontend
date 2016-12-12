import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledIcon = styled(Icon)`
  display: block;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: .4em;
  color: currentColor;
`;

function StreakIcon({ streak }) {
  return (
    <StyledIcon
      name={streak}
      size="1.3em"
    />
  );
}

StreakIcon.propTypes = {
  streak: PropTypes.string.isRequired,
};

export default StreakIcon;
