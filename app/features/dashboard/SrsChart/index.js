import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { PieChart, Pie } from 'recharts';

import {
  selectSrsCounts,
  selectSrsCountsExist,
  selectLargestSliceIndex,
} from 'features/user/selectors';

import Element from 'common/components/Element';
import SrsLegend from './SrsLegend';
import renderActiveShape from './renderActiveShape';

export const SrsChart = ({ data, largestSliceIndex }) => {
  const [activeIndex, setActiveIndex] = React.useState(largestSliceIndex);
  const onPieEnter = React.useCallback(
    (chartData, index) => {
      setActiveIndex(index);
    },
    [data, setActiveIndex],
  );

  return (
    <Element flexRow flexWrap flexCenter>
      <PieChart width={275} height={225}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          innerRadius={45}
          outerRadius={90}
          data={data}
          dataKey="value"
          labelLine={false}
          isAnimationActive={false}
        />
      </PieChart>
      <SrsLegend data={data} />
    </Element>
  );
};

SrsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      fill: PropTypes.string.isRequired,
    }),
  ).isRequired,
  largestSliceIndex: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectSrsCounts(state),
  hasPositiveCount: selectSrsCountsExist(state),
  largestSliceIndex: selectLargestSliceIndex(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ hasPositiveCount }) => !hasPositiveCount, renderNothing),
);

export default enhance(SrsChart);
