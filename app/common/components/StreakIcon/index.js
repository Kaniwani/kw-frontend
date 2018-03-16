import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'voca';

import { SRS_RANKS } from 'common/constants';
import { SRS_COLORS } from 'common/styles/colors';
import getSrsRankName from 'common/utils/getSrsRankName';
import Icon from 'common/components/Icon';

StreakIcon.propTypes = {
  streak: PropTypes.number,
  streakName: PropTypes.oneOf(Object.values(SRS_RANKS)),
  colored: PropTypes.bool,
  size: PropTypes.string,
};

StreakIcon.defaultProps = {
  colored: false,
  size: '1.5em',
};

function StreakIcon({ streak, streakName, colored, ...props }) {
  const name = streakName || getSrsRankName(streak);
  const title = streak ? `${streak}: ${titleCase(name)}` : titleCase(name);
  const color = colored ? SRS_COLORS[name] : 'currentColor';
  return <Icon name={name} title={title} color={color} {...props} />;
}

export default StreakIcon;
