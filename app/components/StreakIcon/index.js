import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'voca';
import { onlyUpdateForKeys } from 'recompose';

import { SRS_RANKS } from 'shared/constants';
import getSrsRankName from 'utils/getSrsRankName';
import Icon from 'components/Icon';

StreakIcon.propTypes = {
  streakName: PropTypes.oneOf(Object.values(SRS_RANKS)),
};

StreakIcon.defaultProps = {
  streakName: getSrsRankName(SRS_RANKS.ZERO),
};

const enhance = onlyUpdateForKeys(['streakName']);

function StreakIcon({ streakName, ...props }) {
  return (
    <Icon name={streakName} title={titleCase(streakName)} {...props} />
  );
}

export default enhance(StreakIcon);
