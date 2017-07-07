import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import calculatePercentage from 'utils/calculatePercentage';
import { select } from 'd3-selection';
import DonutChart from 'britecharts/dist/umd/donut.min';

import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/donut.css';

import PageWrapper from 'base/PageWrapper';
import * as globalSelectors from 'containers/App/selectors';
import { makeSelectHomePage } from './selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    homePage: PropTypes.object,
    user: PropTypes.object,
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
    return (
      <PageWrapper>
        <Helmet
          title="Dashboard"
          meta={[{ name: 'description', content: 'Dashboard' }]}
        />
        <h1>HomePage!</h1>
        <div ref={(node) => { this.chartRef = node; }}></div>
        <h6>homePage</h6>
        <pre><code className="language-javascript">{JSON.stringify(this.props.homePage, null, 2)}</code></pre>
        <h6>user</h6>
        <pre><code className="language-javascript">{JSON.stringify(this.props.user, null, 2)}</code></pre>
        <h6>dashboard</h6>
        <pre><code className="language-javascript">{JSON.stringify(this.props.dashboard, null, 2)}</code></pre>
      </PageWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  user: globalSelectors.selectUser,
  dashboard: globalSelectors.selectDashboard,
});

export default connect(mapStateToProps)(HomePage);
