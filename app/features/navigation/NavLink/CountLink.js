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
    const changed = positiveCount && nextProps.count !== this.props.count;
    this.setState({ changed });
  }

  render() {
    const { name, route, count, onVacation, disabled, isOffCanvas } = this.props;
    return (
      <Li isOffCanvas={isOffCanvas} disabled={disabled} title={onVacation ? 'On Vacation!' : ''}>
        <Link disabled={disabled} to={route} tabIndex={disabled ? -1 : 0}>
          <Text>
            <div>{name}</div>
            {!disabled && (
              <Count changed={this.state.changed} disabled={disabled}>
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
    const disabled = Number.isNaN(count) || count < 1;
    return {
      count,
      disabled,
      onVacation: selectOnVacation(state, props),
    };
  };
};

export default connect(mapStateToProps)(CountLink);
