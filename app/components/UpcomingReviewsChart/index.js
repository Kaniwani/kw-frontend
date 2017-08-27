import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import addHours from 'date-fns/add_hours';
import format from 'date-fns/format';
import debounce from 'lodash/debounce';
import chunk from 'lodash/chunk';
import last from 'lodash/last';
import sumBy from 'lodash/sumBy';

import { SRS_COLORS } from 'shared/styles/colors';
import { select } from 'd3-selection';
import BarChart from 'britecharts/dist/umd/bar.min';
import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/bar.css';

import Element from 'base/Element';

// FIXME: replace mock data with server data
const genName = (count, index) => `${format(addHours(new Date(), index + 1), 'ha')}`;
const genCount = () => ~~(Math.random() * 100);

// combine counts into hour blocks using latest hour as label
const blockData = (data, blockSize) =>
  chunk(data, blockSize)
    .map((block) => ({
      name: last(block).name,
      value: sumBy(block, 'value'),
    }));

// determine hour blocks based on potential text label width
const getBlockSize = (width, numValues) => {
  switch (true) {
    case (width / numValues) < 20: return 4;
    case (width / numValues) < 30: return 3;
    case (width / numValues) < 45: return 2;
    default: return 1;
  }
};

class UpcomingReviewsChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    hourCounts: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    hourCounts: Array.from({ length: 24 }).map(() => genCount() > 40 ? 0 : genCount()),
  };

  state = {}

  componentDidMount() {
    const d3Container = select(this.chartRef);
    const chart = new BarChart();

    const initialWidth = this.chartContainerRef.getBoundingClientRect().width;
    const dataset = this.props.hourCounts.map((count, index) => ({
      name: genName(count, index),
      value: count,
    }));

    const blockSize = getBlockSize(initialWidth, dataset.length);
    const blockedData = blockData(dataset, blockSize);

    if (d3Container.node()) {
      chart
        .colorSchema([SRS_COLORS.GURU])
        .width(initialWidth)
        .height(300)
        .isAnimated(true);

      d3Container.datum(blockedData).call(chart);
    }

    this.setState({ chart, dataset, d3Container, blockSize }); // eslint-disable-line react/no-did-mount-set-state
    window.addEventListener('resize', this.redrawChart);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.redrawChart);
  }

  redrawChart = debounce(() => {
    const newWidth = this.chartContainerRef.getBoundingClientRect().width;
    const blockSize = getBlockSize(newWidth, this.state.dataset.length);
    const blockedData = blockData(this.state.dataset, blockSize);
    this.state.d3Container.datum(blockedData).call(this.state.chart.width(newWidth));
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
