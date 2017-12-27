import React from "react";
import PropTypes from "prop-types";

import getSrsRankName from "common/utils/getSrsRankName";
import Icon from "common/components/Icon";
import StreakIcon from "old/features/StreakIcon";

import { SRS_RANKS } from "common/constants";
import { SRS_COLORS } from "common/styles/colors";
import { FlyoverWrapper, FlyoverContent } from "./styles";

export const IGNORED = "IGNORED";

Flyover.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, IGNORED]).isRequired,
};

const getChanges = (from, to) => {
  if (to !== IGNORED) {
    const [fromName, toName] = [from, to].map(getSrsRankName);
    return {
      toName,
      hasChanged: fromName !== toName && toName !== SRS_RANKS.ZERO,
      animateUp: to > from,
      color: SRS_COLORS[toName],
    };
  }
  return {
    toName: IGNORED,
    hasChanged: true,
    animateUp: true,
    color: "orange",
  };
};

const renderIcon = (toName) => toName === IGNORED ? (
  <Icon name="ATTENTION" title="Answer Ignored" size="1.25em" />
) : (
  <StreakIcon streakName={toName} size="1.25em" />
);

function Flyover({ from, to }) {
  const { toName, ...styleProps } = getChanges(from, to);
  return (
    <FlyoverWrapper>
      <FlyoverContent {...styleProps}>
        <span>{renderIcon(toName)}</span>
        <span>{toName.toLowerCase()}</span>
      </FlyoverContent>
    </FlyoverWrapper>
  );
}

export default Flyover;
