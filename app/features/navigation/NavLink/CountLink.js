import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  selectReviewsCount,
  selectLessonsCount,
  selectOnVacation,
} from "features/user/selectors";


import NavLink from './NavLink';
import { Li, Link, Text, Count } from "./styles";

export class CountLink extends React.Component {
  static propTypes = {
    ...NavLink.propTypes,
    count: PropTypes.number.isRequired,
  }

  state = {
    changed: false,
  }

  componentWillReceiveProps(nextProps) {
    const positiveCount = !Number.isNaN(nextProps.count) && nextProps.count > 0;
    const changed = positiveCount && nextProps.count !== this.props.count;
    this.setState({ changed });
  }

  render() {
    const { name, route, count, disabled, isOffCanvas } = this.props;
    const hasCount = Number.isFinite(count);
    const hasNoReviews = hasCount && count < 1;
    const countDisplay = `${count}`;

    return (
      <Li
        isOffCanvas={isOffCanvas}
        disabled={disabled}
        title={disabled ? "On Vacation!" : ""}
      >
        <Link disabled={disabled} to={route} tabIndex={disabled ? -1 : 0}>
          <Text>
            <div>{name}</div>
            {hasCount && (
              <Count changed={this.state.changed} disabled={hasNoReviews}>
                {countDisplay}
              </Count>
            )}
          </Text>
        </Link>
      </Li>
    );
  }
}

const mapStateToProps = (_, { name }) => {
  const selectCount = name === "reviews" ? selectReviewsCount : selectLessonsCount;

  return (state, props) => ({
    count: selectCount(state, props),
    disabled: props.disabled || selectOnVacation(state, props),
  });
};

export default connect(mapStateToProps)(CountLink);
