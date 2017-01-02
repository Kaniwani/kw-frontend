import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import titleCase from 'utils/titleCase';

const StyledIcon = styled(Icon)`
  display: block;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: .35em;
  color: currentColor;
  background-color: inherit;
`;


function StreakIcon({ streak }) {
  return (
    <StyledIcon
      tooltip={{ text: titleCase(streak), position: 'right', showDelay: 250 }}
      name={streak}
      size="1.15em"
    />
  );
}

StreakIcon.propTypes = {
  streak: PropTypes.string.isRequired,
};

export default StreakIcon;