import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import ReactInterval from 'react-interval';

import nullable from 'utils/propNullable';
import isPast from 'date-fns/is_past';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import H4 from 'base/H4';
import { selectSessionCount, selectNextReviewDate } from 'containers/App/selectors';

ReviewStatus.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  reviewStatusText: PropTypes.string.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  nextReviewDate: nullable(PropTypes.instanceOf(Date)).isRequired,
};

function getReviewStatusText({ reviewsCount, nextReviewDate }) {
  if (!reviewsCount && nextReviewDate == null) return 'No reviews available';
  if (isPast(nextReviewDate)) return 'Now!';
  return distanceInWordsToNow(nextReviewDate, { includeSeconds: true, suffix: true });
}

function ReviewStatus({ updateStatus, reviewStatusText, reviewsCount, nextReviewDate }) {
  return (
    <div>
      {/* TODO: button linking to reviews like previous KW */}
      <H4>Next Review: {reviewStatusText}</H4>
      <ReactInterval
        enabled
        timeout={5000}
        callback={() => updateStatus({ reviewsCount, nextReviewDate })}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  reviewsCount: selectSessionCount(state, { category: 'reviews' }),
  nextReviewDate: selectNextReviewDate(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers(
    (props) => ({ reviewStatusText: getReviewStatusText(props) }),
    { updateStatus: () => ({ reviewsCount, nextReviewDate }) => ({
      reviewStatusText: getReviewStatusText({ reviewsCount, nextReviewDate }),
    }) },
  )
);

export default enhance(ReviewStatus);
