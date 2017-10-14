import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format, addHours, addDays } from 'date-fns';
import { isEqual } from 'lodash';
import { compose, branch, renderNothing, shouldUpdate } from 'recompose';
import { ResponsiveContainer, BarChart, Brush, ReferenceLine, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import { selectUpcomingReviews } from 'components/App/selectors';

import Element from 'base/Element';
import HourTick from './HourTick';
import DayTick from './DayTick';
import BarLabel from './BarLabel';

UpcomingReviewsChart.propTypes = {
  upcomingReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function UpcomingReviewsChart({ upcomingReviews }) {
  // FIXME: use real data once backend task/319 is merged
  const rand100 = () => ~~(Math.random() * 100);
  const genHour = (count, index) => `${format(addHours(new Date(), index + 1), 'ha')}`;
  const genCount = () => rand100() > 70 ? rand100() : 0;

  // TODO: add day/hour info etc in serializer instead once we have data from backend
  let extraDays = 0;
  const getFutureDayName = (daysAhead = 0) => format(addDays(Date.now(), daysAhead), 'dddd');
  const tempData = Array.from({ length: 24 }, () => genCount());
  const dataset = upcomingReviews.length ? upcomingReviews : tempData.map((count, index) => {
    const hour = genHour(count, index);
    const day = hour === '12am' ? getFutureDayName(extraDays += 1) : '';
    return {
      day,
      hour,
      value: count,
    };
  });
  return (
    <Element flexRow flexCenter style={{ fontSize: '.75rem' }}>
      <ResponsiveContainer
        width="100%"
        minWidth={320}
        height={300}
        debounce={100}
      >
        <BarChart
          data={dataset}
          barCategoryGap={2}
          maxBarSize={40}
          margin={{ top: 5, right: 35, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            xAxisId="hour"
            dataKey="hour"
            height={45}
            orientation="bottom"
            minTickGap={0}
            tick={<HourTick />}
          />
          <YAxis width={25} />
          <XAxis
            xAxisId="day"
            dataKey="day"
            orientation="top"
            minTickGap={0}
            interval={0}
            tickLine={false}
            axisLine={false}
            tick={<DayTick />}
          />
          <Bar isAnimationActive xAxisId="day" dataKey="none" fill="#8884d8" label={<BarLabel />} />
          <Bar isAnimationActive xAxisId="hour" dataKey="value" fill="#8884d8" label={<BarLabel />} />
          <Brush dataKey="hour" height={30} stroke="#8884d8" />
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
  // FIXME: re-enable when we have server data
  //  branch(({ upcomingReviews }) => !upcomingReviews.length, renderNothing),
  shouldUpdate((props, nextProps) => !isEqual(props.upcomingReviews, nextProps.upcomingReviews)),
);


export default enhance(UpcomingReviewsChart);
