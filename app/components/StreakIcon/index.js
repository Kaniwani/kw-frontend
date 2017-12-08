import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'voca';
import shouldUpdateDeepEqual from 'utils/shouldUpdateDeepEqual';

import { SRS_RANKS } from 'shared/constants';
import { SRS_COLORS } from 'shared/styles/colors';
import getSrsRankName from 'utils/getSrsRankName';
import Icon from 'components/Icon';

StreakIcon.propTypes = {
  streakName: PropTypes.oneOf(Object.values(SRS_RANKS)),
  colored: PropTypes.bool,
};

StreakIcon.defaultProps = {
  streakName: getSrsRankName(SRS_RANKS.ZERO),
  colored: false,
};

function StreakIcon({ streakName, colored, ...props }) {
  const color = colored ? SRS_COLORS[streakName] : 'currentColor';
  return (
    <Icon name={streakName} title={titleCase(streakName)} color={color} {...props} />
  );
}

export default shouldUpdateDeepEqual()(StreakIcon);
