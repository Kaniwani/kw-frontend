import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format, isPast, isFuture, distanceInWordsToNow } from 'date-fns';
import ReactInterval from 'react-interval';

import styled from 'styled-components';
import { DATE_FORMAT } from 'common/constants';
import { grey, black } from 'common/styles/colors';
import { ffBody, ffHeading } from 'common/styles/typography';

import {
  selectReviewsCount,
  selectOnVacation,
  selectVacationDate,
  selectNextReviewDate,
  selectUsername,
} from 'features/user/selectors';

import user from 'features/user/actions';

import H2 from 'common/components/H2';
import H3 from 'common/components/H3';
import Element from 'common/components/Element';

const Text = H3.extend`
  font-family: ${ffBody};
  font-weight: 600;
  color: ${grey[9]};
`;

const Emphasis = styled.span`
  font-family: ${ffHeading};
  font-weight: 500;
  color: ${black[0]};
`;

/* eslint-disable react/no-unused-prop-types */
export class ReviewStatus extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    isOnVacation: PropTypes.bool.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    vacationDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])])
      .isRequired,
    nextReviewDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])])
      .isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  state = {
    text: getReviewStatusText(this.props),
  };

  updateText = () => this.setState({ text: getReviewStatusText(this.props) });

  render() {
    return (
      <Element flexColumn flexCenter>
        <H2 style={{ color: grey[8] }}>{this.props.username}</H2>
        {this.state.text}
        <ReactInterval
          enabled={!this.props.isOnVacation}
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
  loadUser,
} = {}) {
  if (isOnVacation) {
    return (
      <Text>
        On Vacation: <Emphasis>since ${format(vacationDate, DATE_FORMAT)}</Emphasis>
      </Text>
    );
  }
  if (reviewsCount > 0) {
    return (
      <Text>
        Next Review: <Emphasis>Now!</Emphasis>
      </Text>
    );
  }
  if (reviewsCount < 1 && nextReviewDate === false) {
    return (
      <Text>
        Next Review: <Emphasis>No reviews unlocked</Emphasis>
      </Text>
    );
  }
  if (nextReviewDate && isFuture(nextReviewDate)) {
    return (
      <Text>
        Next Review:{' '}
        <Emphasis>
          {distanceInWordsToNow(nextReviewDate, {
            includeSeconds: true,
            suffix: true,
          })}
        </Emphasis>
      </Text>
    );
  }
  if (nextReviewDate && isPast(nextReviewDate)) {
    loadUser();
  }
  return (
    <Text>
      Next Review: <Emphasis>Unknown</Emphasis>
    </Text>
  );
}

const mapStateToProps = createStructuredSelector({
  username: selectUsername,
  reviewsCount: selectReviewsCount,
  isOnVacation: selectOnVacation,
  vacationDate: selectVacationDate,
  nextReviewDate: selectNextReviewDate,
});

const mapDispatchToProps = {
  loadUser: user.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewStatus);
