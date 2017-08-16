import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';
import isEmpty from 'lodash/isEmpty';

import { SRS_COLORS } from 'shared/styles/colors';
import { selectSrsCounts } from 'containers/App/selectors';
import { select } from 'd3-selection';
import DonutChart from 'britecharts/dist/umd/donut.min';
import LegendChart from 'britecharts/dist/umd/legend.min';
import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/donut.css';

import Element from 'base/Element';

// https://eventbrite.github.io/britecharts/getting-started.html

class SrsChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    const donutContainer = select(this.donutChartRef);
    const legendContainer = select(this.legendChartRef);
    const donutChart = new DonutChart();
    const legendChart = new LegendChart();

    const dataset = Object.entries(this.props.srsCounts).map(([name, count], id) => ({
      quantity: count,
      name,
      id,
    }));

    const containerWidth = (document.body.clientWidth / 2);
    const colorList = Object.values(SRS_COLORS);
    if (donutContainer.node()) {
      donutChart
        .isAnimated(true)
        .colorSchema(colorList)
        .width(320)
        .height(containerWidth / 1.9)
        .externalRadius(containerWidth / 5)
        .internalRadius(containerWidth / 10)
        .on('customMouseOver', (data) => {
          legendChart.highlight(data.data.id);
        })
        .on('customMouseOut', () => {
          legendChart.clearHighlight();
        });

      legendChart
        .width(320)
        .colorSchema(colorList)
        .numberFormat('d'); // whole integer

      donutContainer.datum(dataset).call(donutChart);
      legendContainer.datum(dataset).call(legendChart);
    }
  }

  render() {
    return (
      <Element flexRow flexWrap flexCenter>
        <div ref={(node) => { this.donutChartRef = node; }} />
        <div ref={(node) => { this.legendChartRef = node; }} />
      </Element>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  srsCounts: selectSrsCounts,
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ srsCounts }) => isEmpty(srsCounts), renderNothing)
);

export default enhance(SrsChart);
