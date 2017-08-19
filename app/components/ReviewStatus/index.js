import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import ReactInterval from 'react-interval';

import nullable from 'utils/propNullable';
import isPast from 'date-fns/is_past';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import H3 from 'base/H3';
import Element from 'base/Element';
import { selectSessionCount, selectOnVacation, selectNextReviewDate } from 'containers/App/selectors';

ReviewStatus.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  reviewStatusText: PropTypes.string.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  onVacation: PropTypes.bool.isRequired,
  nextReviewDate: nullable(PropTypes.instanceOf(Date)),
};

function getReviewStatusText({ onVacation, reviewsCount, nextReviewDate }) {
  if (onVacation) return 'On Vacation!';
  if (!reviewsCount && nextReviewDate == null) return 'No reviews available';
  if (isPast(nextReviewDate)) return 'Now!';
  return distanceInWordsToNow(nextReviewDate, { includeSeconds: true, suffix: true });
}

function ReviewStatus({ updateStatus, reviewStatusText, onVacation, reviewsCount, nextReviewDate }) {
  return (
    <Element flexRow flexCenter>
      {/* TODO: button linking to reviews like previous KW */}
      <H3>Next Review: {reviewStatusText}</H3>
      <ReactInterval
        enabled
        timeout={5000}
        callback={() => updateStatus({ onVacation, reviewsCount, nextReviewDate })}
      />
    </Element>
  );
}

const mapStateToProps = (state) => ({
  reviewsCount: selectSessionCount(state, { category: 'reviews' }),
  nextReviewDate: selectNextReviewDate(state),
  vacationDate: selectOnVacation(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers(
    (props) => ({ reviewStatusText: getReviewStatusText(props) }),
    { updateStatus: () => ({ onVacation, reviewsCount, nextReviewDate }) => ({
      reviewStatusText: getReviewStatusText({ onVacation, reviewsCount, nextReviewDate }),
    }) },
  )
);

export default enhance(ReviewStatus);
