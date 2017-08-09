import React from 'react';
import PropTypes from 'prop-types';

import titleCase from 'voca/title_case';
import getSrsRankName from 'utils/getSrsRankName';
import StreakIcon from 'components/StreakIcon';

import Element from 'base/Element';
import H5 from 'base/H5';

StreakStatus.propTypes = {
  streak: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

function StreakStatus({ streak, category }) {
  return (
    <Element flexRow alignItems="center">
      <H5>{category}: {titleCase(getSrsRankName(streak))}</H5>
      <StreakIcon streakName={getSrsRankName(streak)} size="2em" />
    </Element>
  );
}


export default StreakStatus;
