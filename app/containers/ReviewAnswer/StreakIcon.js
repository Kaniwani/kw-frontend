import React, { PropTypes } from 'react';
import styled from 'styled-components';
import getSrsRankName from 'utils/getSrsRankName';
import Icon from 'components/Icon';

// FIXME: might just need to add another wrapper before this since the Icon wrapper is pos: absolute already which we're messing up here. Or rethink styling since the old icon (scss/kw) never had a wrapper.
const StyledIcon = styled(Icon)`
  display: block;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: .5em;
  color: currentColor;
`;

// TODO: apply getSrsRankName in selector instead!
function StreakIcon({ streak }) {
  return (
    <StyledIcon
      name={getSrsRankName(streak).toUpperCase()}
      size="1.3em"
    />
  );
}

StreakIcon.propTypes = {
  streak: PropTypes.number,
};

export default StreakIcon;
