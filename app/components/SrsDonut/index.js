import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import calculatePercentage from 'utils/calculatePercentage';
import { selectSrsCounts } from 'containers/App/selectors';
import { select } from 'd3-selection';
import DonutChart from 'britecharts/dist/umd/donut.min';
import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/donut.css';

// https://eventbrite.github.io/britecharts/getting-started.html

class SrsDonut extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    srsCounts: PropTypes.shape({
      UNTRAINED: PropTypes.number,
      APPRENTICE: PropTypes.number,
      GURU: PropTypes.number,
      MASTER: PropTypes.number,
      ENLIGHTENED: PropTypes.number,
      BURNED: PropTypes.number,
    }).isRequired,
  }

  componentDidMount() {
    const donutContainer = select(this.chartRef);
    const donutChart = new DonutChart();

    const total = Object.values(this.props.srsCounts).reduce((sum, val) => sum + val, 0);
    const donutData = Object.entries(this.props.srsCounts).map(([name, count], id) => ({
      quantity: count,
      percentage: calculatePercentage(count, total),
      name,
      id,
    }));

    const containerWidth = 400;
    if (donutContainer.node()) {
      donutChart
          .width(containerWidth)
          .height(containerWidth / 1.8)
          .externalRadius(containerWidth / 5)
          .internalRadius(containerWidth / 10);
          // .on('customMouseOver', (data) => {
          //   legendChart.highlight(data.data.id);
          // })
          // .on('customMouseOut', () => {
          //   legendChart.clearHighlight();
          // });

      donutContainer.datum(donutData).call(donutChart);
    }
  }

  render() {
    return (
      <div ref={(node) => { this.chartRef = node; }} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  srsCounts: selectSrsCounts,
});

export default connect(mapStateToProps)(SrsDonut);
