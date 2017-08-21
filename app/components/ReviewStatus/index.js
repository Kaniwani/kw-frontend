import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import ReactInterval from 'react-interval';

import isPast from 'date-fns/is_past';
import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { DATE_FORMAT } from 'shared/constants';
import H3 from 'base/H3';
import Element from 'base/Element';
import { selectSessionCount, selectVacationDate, selectNextReviewDate } from 'containers/App/selectors';

ReviewStatus.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  reviewStatusText: PropTypes.string.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  vacationDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
  nextReviewDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
};

function getReviewStatusText({ vacationDate, reviewsCount, nextReviewDate }) {
  if (vacationDate) return `On Vacation since ${format(vacationDate, DATE_FORMAT)}`;
  if (!reviewsCount && !nextReviewDate) return 'Next Review: No reviews unlocked';
  if (isPast(nextReviewDate)) return 'Reviews Ready!';
  return `Next Review: ${distanceInWordsToNow(nextReviewDate, { includeSeconds: true, suffix: true })}`;
}

function ReviewStatus({ updateStatus, reviewStatusText, vacationDate, reviewsCount, nextReviewDate }) {
  return (
    <Element flexRow flexCenter>
      <H3>{reviewStatusText}</H3>
      <ReactInterval
        enabled
        timeout={5000}
        callback={() => updateStatus({ vacationDate, reviewsCount, nextReviewDate })}
      />
    </Element>
  );
}

const mapStateToProps = (state) => ({
  reviewsCount: selectSessionCount(state, { category: 'reviews' }),
  nextReviewDate: selectNextReviewDate(state),
  vacationDate: selectVacationDate(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers(
    (props) => ({ reviewStatusText: getReviewStatusText(props) }),
    { updateStatus: () => ({ vacationDate, reviewsCount, nextReviewDate }) => ({
      reviewStatusText: getReviewStatusText({ vacationDate, reviewsCount, nextReviewDate }),
    }) },
  )
);

export default enhance(ReviewStatus);
