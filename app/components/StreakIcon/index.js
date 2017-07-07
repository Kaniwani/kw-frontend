import React from 'react';
import PropTypes from 'prop-types';
import titleCase from 'voca/title_case';
import { onlyUpdateForKeys } from 'recompose';

import Icon from 'components/Icon';
import { SRS_RANKS } from 'shared/constants';

StreakIcon.propTypes = {
  streakName: PropTypes.oneOf(Object.values(SRS_RANKS)).isRequired,
};

const enhance = onlyUpdateForKeys(['streakName']);

function StreakIcon({ streakName, ...props }) {
  return (
    <Icon name={streakName} title={titleCase(streakName)} {...props} />
  );
}

export default enhance(StreakIcon);
