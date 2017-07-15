import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import format from 'date-fns/format';

import { DATE_IN_WORDS } from 'shared/constants';

import H1 from 'base/H1';
import H2 from 'base/H2';
import H3 from 'base/H3';
import H4 from 'base/H4';

import calculatePercentage from 'utils/calculatePercentage';
import { select } from 'd3-selection';
import DonutChart from 'britecharts/dist/umd/donut.min';

import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/donut.css';

import PageWrapper from 'base/PageWrapper';
import {
  selectProfile,
  selectDashboard,
} from 'containers/App/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profile: PropTypes.object,
    dashboard: PropTypes.object,
  }

  // https://eventbrite.github.io/britecharts/getting-started.html
  componentDidMount() {
    const donutContainer = select(this.chartRef);
    const donutChart = new DonutChart();

    const total = Object.values(this.props.dashboard.srsCounts).reduce((sum, val) => sum + val, 0);
    const donutData = Object.entries(this.props.dashboard.srsCounts).map(([name, count], id) => ({
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
    const { profile, dashboard } = this.props;
    return (
      <PageWrapper>
        <Helmet
          title="Dashboard"
          meta={[{ name: 'description', content: 'Dashboard' }]}
        />
        <H1>{profile.name}</H1>
        <H3>Next Hour: {dashboard.nextHourReviews}</H3>
        <H3>Next Day: {dashboard.nextDayReviews}</H3>
        <H4>Last Sync with WK: {format(dashboard.lastWkSyncDate, DATE_IN_WORDS)}</H4>
      </PageWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  dashboard: selectDashboard,
});

export default connect(mapStateToProps)(HomePage);
