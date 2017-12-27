import React from "react";
import PropTypes from "prop-types";
import { titleCase } from "voca";

import { SRS_RANKS } from "common/constants";
import { SRS_COLORS } from "common/styles/colors";
import getSrsRankName from "common/utils/getSrsRankName";
import Icon from "common/components/Icon";

StreakIcon.propTypes = {
  streakName: PropTypes.oneOf(Object.values(SRS_RANKS)),
  colored: PropTypes.bool,
  size: PropTypes.string,
};

StreakIcon.defaultProps = {
  streakName: getSrsRankName(SRS_RANKS.ZERO),
  colored: false,
  size: "1.5em",
};

function StreakIcon({ streakName, colored, ...props }) {
  const color = colored ? SRS_COLORS[streakName] : "currentColor";
  return (
    <Icon name={streakName} title={titleCase(streakName)} color={color} {...props} />
  );
}

export default StreakIcon;
