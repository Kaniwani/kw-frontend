import React from 'react';
import PropTypes from 'prop-types';

import getSrsRankName from 'utils/getSrsRankName';
import StreakIcon from 'components/StreakIcon';

import {
  StreakAnimationWrapper,
  StreakAnimationContent,
  StreakText,
} from './styles';


StreakChange.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
};

function StreakChange({ from, to }) {
  const [fromName, toName] = [from, to].map(getSrsRankName);
  const rankUp = to > from;
  const changed = fromName !== toName;
  const iconName = rankUp ? 'ARROW_UP' : 'ARROW_DOWN';

  return (
    <StreakAnimationWrapper>
      <StreakAnimationContent streakName={toName} changed={changed} rankUp={rankUp}>
        <StreakIcon name={iconName} />
        <StreakText>{toName.toLowerCase()}</StreakText>
      </StreakAnimationContent>
    </StreakAnimationWrapper>
  );
}

export default StreakChange;
