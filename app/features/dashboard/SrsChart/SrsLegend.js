import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import StreakIcon from "common/components/StreakIcon";
import {
  LegendWrapper,
  LegendList,
  LegendListItem,
  LegendName,
  LegendValue,
} from "./styles";

SrsLegend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function SrsLegend({ data }) {
  return (
    <LegendWrapper>
      <LegendList>{data.slice(0, 3).map(ListItem)}</LegendList>
      <LegendList>{data.slice(3).map(ListItem)}</LegendList>
    </LegendWrapper>
  );
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

function ListItem({ name, value }) {
  return (
    <LegendListItem key={cuid()}>
      <StreakIcon inline={false} streakName={name.toUpperCase()} colored />
      <LegendName>{name}</LegendName>
      <LegendValue>{value}</LegendValue>
    </LegendListItem>
  );
}

export default SrsLegend;
