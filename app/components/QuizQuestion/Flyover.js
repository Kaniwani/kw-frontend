import React from 'react';
import PropTypes from 'prop-types';

import getSrsRankName from 'utils/getSrsRankName';
import Icon from 'components/Icon';
import StreakIcon from 'components/StreakIcon';

import { FlyoverWrapper, FlyoverContent } from './styles';

Flyover.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  ignored: PropTypes.bool,
};

Flyover.defaultProps = {
  ignored: false,
};

function Flyover({ from, to, ignored }) {
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
    <FlyoverWrapper>
      <FlyoverContent ignored={ignored} streakName={toName} changed={changed} rankUp={rankUp}>
        {ignored ? <Icon name="ATTENTION" title="Answer Ignored" size="1.25em" /> : <StreakIcon streakName={iconName} size="1.25em" />}
        <div>{toName.toLowerCase()}</div>
      </FlyoverContent>
    </FlyoverWrapper>
  );
}

export default Flyover;
