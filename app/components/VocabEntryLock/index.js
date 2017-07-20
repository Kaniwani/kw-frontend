import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import actions from 'containers/App/actions';
import { makeSelectReviewHidden } from 'containers/App/selectors';

import LockButton from 'components/LockButton';

VocabEntryLock.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function VocabEntryLock({ isHidden, handleClick, ...props }) {
  return (
    <LockButton isLocked={isHidden} handleClick={handleClick} {...props} />
  );
}

const mapStateToProps = (state, { id }) => ({
  isHidden: makeSelectReviewHidden(id)(state),
});

const mapDispatchToProps = {
  lockReview: actions.review.lock.request,
  unlockReview: actions.review.unlock.request,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ isHidden }) => isHidden === null, renderNothing),
  withHandlers({
    handleClick: ({ id, isHidden, lockReview, unlockReview }) => () =>
      isHidden ? unlockReview({ id }) : lockReview({ id }),
  }),
);

export default enhance(VocabEntryLock);
