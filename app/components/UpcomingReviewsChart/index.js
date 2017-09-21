import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format, addHours, addDays } from 'date-fns';
import { isEqual } from 'lodash';
import { compose, shouldUpdate } from 'recompose';
import { ResponsiveContainer, BarChart, Brush, ReferenceLine, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import { blackLight, greyDark } from 'shared/styles/colors';
import { selectUpcomingReviews } from 'containers/App/selectors';

import Element from 'base/Element';

const CustomizedLabel = ({ x, y, width, height, value }) => value > 0 ? (
  <text x={x} y={y} dy={-4} dx={width / 2} fill={blackLight} fontSize=".8rem" textAnchor="middle">{value}</text>
) : null;

const DayTick = ({ x, y, payload }) => payload.value ? (
  <g>
    <text x={x} y={y} dx={0} dy={-6} textAnchor="middle" fill={greyDark} fontSize=".85rem">
      {payload.value}
    </text>
  </g>
) : null;

const HourTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dx={5} dy={15} textAnchor="end" fill={greyDark} fontSize=".85rem" transform="rotate(-35)">{payload.value}</text>
  </g>
);

UpcomingReviewsChart.propTypes = {
  upcomingReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function UpcomingReviewsChart({ upcomingReviews }) {
  console.log(upcomingReviews);
  const genHour = (count, index) => `${format(addHours(new Date(), index + 1), 'ha')}`;
  const genCount = () => ~~(Math.random() * 100);

  let extraDays = 0;
  const getFutureDayName = (daysAhead = 0) => format(addDays(Date.now(), daysAhead), 'dddd');
  const dataset = upcomingReviews.length ? upcomingReviews : Array.from({ length: 24 }, () => genCount()).map((count, index) => {
    const hour = genHour(count, index);
    const day = hour === '12am' ? getFutureDayName(extraDays += 1) : '';
    return {
      day,
      hour,
      value: count,
    };
  });

  return (
    <Element flexRow flexCenter>
      <ResponsiveContainer width="100%" minWidth={320} height={300} debounce={100}>
        <BarChart barCategoryGap={2} maxBarSize={40} data={dataset} isAnimationActive margin={{ top: 5 }}>
          <XAxis tickLine={false} axisLine={false} xAxisId="day" orientation="top" dataKey="day" tick={<DayTick />} />
          <XAxis xAxisId="hour" orientation="bottom" dataKey="hour" height={45} tick={<HourTick />} />
          <YAxis fontSize=".75rem" />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="hour" height={30} stroke="#8884d8" />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar xAxisId="day" dataKey="none" fill="#8884d8" label={<CustomizedLabel />} />
          <Bar xAxisId="hour" dataKey="value" fill="#8884d8" label={<CustomizedLabel />} />
        </BarChart>
      </ResponsiveContainer>
    </Element>
  );
}

const mapStateToProps = createStructuredSelector({
  upcomingReviews: selectUpcomingReviews,
});

const enhance = compose(
  connect(mapStateToProps),
  shouldUpdate((props, nextProps) => !isEqual(props.upcomingReviews, nextProps.upcomingReviews)),
);

export default enhance(UpcomingReviewsChart);
