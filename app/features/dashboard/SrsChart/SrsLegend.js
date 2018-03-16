import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import StreakIcon from 'common/components/StreakIcon';
import { LegendList, LegendListItem, LegendName, LegendValue } from './styles';

SrsLegend.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};

function SrsLegend({ data }) {
  return (
    <LegendList>
      {data.map(({ name, value }) => (
        <LegendListItem key={cuid()}>
          <StreakIcon inline={false} streakName={name.toUpperCase()} colored />
          <LegendName>{name}</LegendName>
          <LegendValue>{value}</LegendValue>
        </LegendListItem>
      ))}
    </LegendList>
  );
}

export default SrsLegend;
