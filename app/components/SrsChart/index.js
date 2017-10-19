import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderNothing } from 'recompose';
import { isEmpty } from 'lodash';
import titleCase from 'voca/title_case';
import { PieChart, Pie } from 'recharts';
import { SRS_COLORS } from 'shared/styles/colors';
import shouldUpdateDeepEqual from 'utils/shouldUpdateDeepEqual';

import Element from 'base/Element';
import SrsLegend from './SrsLegend';
import renderActiveShape from './renderActiveShape';

class SrsChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    data: PropTypes.shape({
      UNTRAINED: PropTypes.number,
      APPRENTICE: PropTypes.number,
      GURU: PropTypes.number,
      MASTER: PropTypes.number,
      ENLIGHTENED: PropTypes.number,
      BURNED: PropTypes.number,
    }).isRequired,
  }

  state = {
    activeIndex: 1,
  }

  onPieEnter = (data, index) => {
    this.setState({ activeIndex: index });
  }

  render() {
    const dataset = Object.entries(this.props.data)
      .map(([name, value], index) => ({
        name: titleCase(name),
        value,
        fill: Object.values(SRS_COLORS)[index],
      }));

    return (
      <Element flexRow flexWrap flexCenter>
        <PieChart width={275} height={225}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={this.onPieEnter}
            innerRadius={45}
            outerRadius={90}
            data={dataset}
            dataKey="value"
            labelLine={false}
            isAnimationActive
          />
        </PieChart>
        <SrsLegend data={dataset} />
      </Element>
    );
  }
}

export default compose(
  branch(({ data }) => isEmpty(data), renderNothing),
  shouldUpdateDeepEqual(['data']),
)(SrsChart);
