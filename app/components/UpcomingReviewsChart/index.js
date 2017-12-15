import React from "react";
import PropTypes from "prop-types";
import { compose, branch, renderNothing } from "recompose";
import shouldUpdateDeepEqual from "utils/shouldUpdateDeepEqual";
import {
  ResponsiveContainer,
  BarChart,
  Brush,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Element from "base/Element";
import HourTick from "./HourTick";
import DayTick from "./DayTick";
import BarLabel from "./BarLabel";

UpcomingReviewsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      hour: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

function UpcomingReviewsChart({ data }) {
  return (
    <Element flexRow flexCenter style={{ fontSize: ".75rem" }}>
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
            fill="#8884d8"
            label={<BarLabel />}
          />
          <Bar
            isAnimationActive
            xAxisId="hour"
            dataKey="value"
            fill="#8884d8"
            label={<BarLabel />}
          />
          <Brush dataKey="hour" height={30} stroke="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Element>
  );
}

export default compose(
  branch(({ data }) => !data.length, renderNothing),
  shouldUpdateDeepEqual(["data"])
)(UpcomingReviewsChart);
