import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, branch, renderNothing, pure } from 'recompose';
import ReactInterval from 'react-interval';

import { selectSessionCount, selectVacationDate, selectNextReviewDate } from 'shared/selectors';
import getReviewStatusText from 'utils/getReviewStatusText';
import H3 from 'base/H3';
import Element from 'base/Element';

ReviewStatus.propTypes = {
  reviewsCount: PropTypes.number.isRequired,
  vacationDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
  nextReviewDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
};

function ReviewStatus({ reviewsCount, vacationDate, nextReviewDate }) {
  return (
    <Element flexRow flexCenter>
      <H3>{getReviewStatusText({ reviewsCount, vacationDate, nextReviewDate })}</H3>
      <ReactInterval
        enabled
        timeout={5000}
        callback={() => getReviewStatusText({ reviewsCount, vacationDate, nextReviewDate })}
      />
    </Element>
  );
}

const mapStateToProps = (state) => ({
  reviewsCount: selectSessionCount(state, { category: 'reviews' }),
  vacationDate: selectVacationDate(state),
  nextReviewDate: selectNextReviewDate(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ nextReviewDate }) => nextReviewDate === undefined, renderNothing),
  pure,
);

export default enhance(ReviewStatus);
