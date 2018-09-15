import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactInterval from 'react-interval';
import { ResponsiveContainer, BarChart, Brush, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { startOfHour, setHours, isBefore } from 'date-fns';
import { get } from 'lodash';
import { selectOnVacation, selectUpcomingReviews } from 'features/user/selectors';

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
    })
  ).isRequired,
};

export function UpcomingReviewsChart({ data }) {
  return (
    <Element flexRow flexCenter style={{ fontSize: '.75rem' }}>
      <ResponsiveContainer width="100%" minWidth={320} height={300} debounce={100}>
        <BarChart
          data={data}
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
            isAnimationActive
            xAxisId="day"
            dataKey="none"
            fill={purple[3]}
            label={<BarLabel />}
          />
          <Bar
            isAnimationActive
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

class UpcomingReviewsChartContainer extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isOnVacation: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.updateCounts();
  }

  updateCounts = () => {
    const { data, loadUser } = this.props;
    const hour = get(data, [0, 'hour'], null);

    if (hour == null) return;

    const twentyFourHour = parseInt(hour, 10) + (/pm/gi.test(hour) ? 12 : 0);
    const fullDate = setHours(Date.now(), twentyFourHour);
    const hourTickedOver = isBefore(startOfHour(fullDate), Date.now());

    if (hourTickedOver && window.navigator.onLine) {
      loadUser();
    }
  };

  render() {
    const { data, isOnVacation } = this.props;

    return isOnVacation ? (
      <VacationImage />
    ) : (
      <Fragment>
        <ReactInterval enabled timeout={10000} callback={this.updateCounts} />
        <UpcomingReviewsChart data={data} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: selectUpcomingReviews(state),
  isOnVacation: selectOnVacation(state),
});

const mapDispatchToProps = {
  loadUser: user.load.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingReviewsChartContainer);
