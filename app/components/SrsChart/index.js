import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, branch, renderNothing, shouldUpdate } from 'recompose';
import { isEmpty, isEqual } from 'lodash';
import titleCase from 'voca/title_case';
import { PieChart, Pie } from 'recharts';
import { SRS_COLORS } from 'shared/styles/colors';
import { selectSrsCounts } from 'containers/App/selectors';

import Element from 'base/Element';
import SrsLegend from './SrsLegend';
import renderActiveShape from './renderActiveShape';

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

  state = {
    activeIndex: 1,
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const dataset = Object.entries(this.props.srsCounts)
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

const mapStateToProps = createStructuredSelector({
  srsCounts: selectSrsCounts,
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ srsCounts }) => isEmpty(srsCounts), renderNothing),
  shouldUpdate((props, nextProps) => !isEqual(props.srsCounts, nextProps.srsCounts)),
);

export default enhance(SrsChart);
