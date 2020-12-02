import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactInterval from 'react-interval';
import { ResponsiveContainer, BarChart, Brush, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { startOfHour, setHours, isBefore } from 'date-fns';
import { get } from 'lodash';
import { selectOnVacation, selectReviewsCount, selectUpcomingReviews } from 'features/user/selectors';

import user from 'features/user/actions';

import Element from 'common/components/Element';
import { purple } from 'common/styles/colors';
import BarLabel from './BarLabel';
import DayTick from './DayTick';
import HourTick from './HourTick';
import VacationImage from './VacationImageLoadable';

UpcomingReviewsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      hour: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  reviewsCount: PropTypes.number.isRequired,
};

export function UpcomingReviewsChart({ data, reviewsCount }) {
  const aggregateData = data;
  aggregateData[0] = { ...aggregateData[0], value: reviewsCount };
  return (
    <Element flexRow flexCenter style={{ fontSize: '.75rem' }}>
      <ResponsiveContainer width="100%" minWidth={320} height={300} debounce={100}>
        <BarChart
          data={aggregateData}
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
          <Bar
            isAnimationActive={false}
            xAxisId="day"
            dataKey="none"
            fill={purple[3]}
            label={<BarLabel />}
          />
          <Bar
            isAnimationActive={false}
            xAxisId="hour"
            dataKey="value"
            fill={purple[3]}
            label={<BarLabel />}
          />
          <Brush dataKey="hour" height={30} stroke={purple[3]} />
        </BarChart>
      </ResponsiveContainer>
    </Element>
  );
}

UpcomingReviewsChartContainer.propTypes = {
  data: PropTypes.array.isRequired,
  isOnVacation: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
};

function UpcomingReviewsChartContainer({ data, loadUser, isOnVacation, reviewsCount }) {
  const updateCounts = React.useCallback(() => {
    const hour = get(data, [0, 'hour'], null);

    if (hour == null) {
      return;
    }

    const twentyFourHour = parseInt(hour, 10) + (/pm/gi.test(hour) ? 12 : 0);
    const fullDate = setHours(Date.now(), twentyFourHour);
    const hourTickedOver = isBefore(startOfHour(fullDate), Date.now());

    // reload counts when hour ticks over so the graph shifts along Y axis
    if (hourTickedOver && window.navigator.onLine) {
      loadUser();
    }
  }, [data, loadUser]);

  React.useEffect(updateCounts, []);

  return isOnVacation ? (
    <VacationImage />
  ) : (
    <>
      <ReactInterval enabled timeout={10000} callback={updateCounts} />
      <UpcomingReviewsChart data={data} reviewsCount={reviewsCount} />
    </>
  );
}

const mapStateToProps = (state) => ({
  data: selectUpcomingReviews(state),
  reviewsCount: selectReviewsCount(state),
  isOnVacation: selectOnVacation(state),
});

const mapDispatchToProps = {
  loadUser: user.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingReviewsChartContainer);
