import React from 'react';
import PropTypes from 'prop-types';

import getSrsRankName from 'utils/getSrsRankName';
import Icon from 'components/Icon';
import StreakIcon from 'components/StreakIcon';

import {
  StreakAnimationWrapper,
  StreakAnimationContent,
  StreakText,
} from './styles';


StreakChange.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  ignored: PropTypes.bool,
};

StreakChange.defaultProps = {
  ignored: false,
};

function StreakChange({ from, to, ignored }) {
  let [fromName, toName] = [from, to].map(getSrsRankName); // eslint-disable-line prefer-const
  const iconName = toName;
  let rankUp;
  let changed;
  if (ignored) {
    rankUp = true;
    changed = true;
    toName = 'IGNORED';
  } else {
    rankUp = to > from;
    changed = fromName !== toName;
  }

  return (
    <StreakAnimationWrapper>
      <StreakAnimationContent ignored={ignored} streakName={toName} changed={changed} rankUp={rankUp}>
        {ignored ? <Icon name="ATTENTION" title="Answer Ignored" /> : <StreakIcon streakName={iconName} />}
        <StreakText>{toName.toLowerCase()}</StreakText>
      </StreakAnimationContent>
    </StreakAnimationWrapper>
  );
}

export default StreakChange;
