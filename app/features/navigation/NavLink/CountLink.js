import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectReviewsCount, selectLessonsCount, selectOnVacation } from 'features/user/selectors';

import NavLink from './NavLink';
import { Li, Link, Text, Count } from './styles';

export class CountLink extends React.Component {
  static propTypes = {
    ...NavLink.propTypes,
    onVacation: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
  };

  state = {
    changed: false,
  };

  componentWillReceiveProps(nextProps) {
    const positiveCount = !Number.isNaN(nextProps.count) && nextProps.count > 0;
    const newReviews = nextProps.count !== this.props.count;
    this.setState({ changed: positiveCount && newReviews });
  }

  render() {
    const { name, route, count, onVacation, noReviews, isOffCanvas } = this.props;
    return (
      <Li isOffCanvas={isOffCanvas} title={onVacation ? 'On Vacation!' : ''}>
        <Link noReviews={noReviews} to={route}>
          <Text>
            <div>{name}</div>
            {!noReviews && (
              <Count changed={this.state.changed} noReviews={noReviews}>
                {count}
              </Count>
            )}
          </Text>
        </Link>
      </Li>
    );
  }
}

const mapStateToProps = (_, { name }) => {
  const selectCount = name === 'reviews' ? selectReviewsCount : selectLessonsCount;

  return (state, props) => {
    const count = selectCount(state, props);
    const noReviews = Number.isNaN(count) || count < 1;
    return {
      count,
      noReviews,
      onVacation: selectOnVacation(state, props),
    };
  };
};

export default connect(mapStateToProps)(CountLink);
