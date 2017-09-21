import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import StreakIcon from 'components/StreakIcon';
import {
  LegendWrapper,
  LegendList,
  LegendListItem,
  LegendName,
  LegendValue,
} from './styles';

const renderListItem = ({ name, value }) => ( // eslint-disable-line react/prop-types
  <LegendListItem key={cuid()}>
    <StreakIcon inline={false} streakName={name.toUpperCase()} colored />
    <LegendName>{name}</LegendName>
    <LegendValue>{value}</LegendValue>
  </LegendListItem>
);

SrsLegend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function SrsLegend({ data }) {
  return (
    <LegendWrapper>
      <LegendList>{data.slice(0, 3).map(renderListItem)}</LegendList>
      <LegendList>{data.slice(3).map(renderListItem)}</LegendList>
    </LegendWrapper>
  );
}

export default SrsLegend;
