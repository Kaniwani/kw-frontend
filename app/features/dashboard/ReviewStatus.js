import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { format, isPast, isFuture, distanceInWordsToNow } from "date-fns";
import ReactInterval from "react-interval";
import { DATE_FORMAT } from "common/constants";

import {
  selectReviewsCount,
  selectOnVacation,
  selectVacationDate,
  selectNextReviewDate,
} from "features/user/selectors";

import H3 from "common/components/H3";
import Element from "common/components/Element";

/* eslint-disable react/no-unused-prop-types */
export class ReviewStatus extends React.Component {
  static propTypes = {
    isOnVacation: PropTypes.bool.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    vacationDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.oneOf([false]),
    ]).isRequired,
    nextReviewDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.oneOf([false]),
    ]).isRequired,
  };

  state = {
    text: getReviewStatusText(this.props),
  };

  updateText = () => this.setState({ text: getReviewStatusText(this.props) });

  render() {
    return (
      <Element flexRow flexCenter>
        <H3>{this.state.text}</H3>
        {/* updates "review in x time" text periodically */}
        <ReactInterval
          enabled={!this.props.isOnVacation && isFuture(this.props.nextReviewDate)}
          timeout={5000}
          callback={this.updateText}
        />
      </Element>
    );
  }
}

export function getReviewStatusText({
  isOnVacation,
  reviewsCount,
  vacationDate,
  nextReviewDate,
} = {}) {
  if (isOnVacation) {
    return `On Vacation since ${format(vacationDate, DATE_FORMAT)}`;
  }
  if (reviewsCount > 0) {
    return "Next Review: Now!";
  }
  if (reviewsCount < 1 && nextReviewDate === false) {
    return "Next Review: No reviews unlocked";
  }
  if (nextReviewDate && isFuture(nextReviewDate)) {
    return `Next Review: ${distanceInWordsToNow(nextReviewDate, {
      includeSeconds: true,
      suffix: true,
    })}`;
  }
  return "Next Review: Unknown";
}

const mapStateToProps = createStructuredSelector({
  reviewsCount: selectReviewsCount,
  isOnVacation: selectOnVacation,
  vacationDate: selectVacationDate,
  nextReviewDate: selectNextReviewDate,
});

export default connect(mapStateToProps)(ReviewStatus);
