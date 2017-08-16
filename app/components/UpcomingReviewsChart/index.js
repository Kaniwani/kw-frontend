import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import addHours from 'date-fns/add_hours';
import format from 'date-fns/format';
import debounce from 'lodash/debounce';

import { siteMaxWidth } from 'shared/styles/sizing';
import { select } from 'd3-selection';
import BarChart from 'britecharts/dist/umd/bar.min';
import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/bar.css';

import Element from 'base/Element';

// https://eventbrite.github.io/britecharts/getting-started.html
const genCount = () => ~~(Math.random() * 100);
const genName = (count, index) => `${format(addHours(Date.now(), index + 1), 'ha')}`;

class UpcomingReviewsChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    hourCounts: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    hourCounts: Array.from({ length: 24 }).map(() => genCount() > 40 ? 0 : genCount()),
  };

  state = {
    chart: {},
  }

  componentDidMount() {
    const d3Container = select(this.chartRef);
    const chart = new BarChart();

    const initialWidth = Math.max(siteMaxWidth, document.body.clientWidth) - 100;
    const dataset = this.props.hourCounts.map((count, index) => ({
      value: count,
      name: genName(count, index),
    }));

    if (d3Container.node()) {
      chart
        .width(initialWidth)
        .height(300)
        .isAnimated(true);

      d3Container.datum(dataset).call(chart);
    }

    this.setState({ chart, dataset, d3Container });
    window.addEventListener('resize', this.redrawChart);
  }

  redrawChart = debounce(() => {
    const newContainerWidth = this.chartContainerRef.getBoundingClientRect().width;
    this.state.chart.width(newContainerWidth);
    this.state.d3Container.datum(this.state.dataset).call(this.state.chart);
  }, 200)

  render() {
    return (
      <Element flexRow flexCenter innerRef={(node) => { this.chartContainerRef = node; }}>
        <div ref={(node) => { this.chartRef = node; }} />
      </Element>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // hourCounts: selectSrsCounts,
});

export default connect(mapStateToProps)(UpcomingReviewsChart);
