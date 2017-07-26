import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import actions from 'containers/App/actions';
import { makeSelectReviewHidden } from 'containers/App/selectors';

import LockButton from 'components/LockButton';
import { Wrapper, Text } from './styles';

VocabEntryLock.propTypes = {
  isHidden: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

VocabEntryLock.defaultProps = {
  isHidden: false,
};

function VocabEntryLock({ isHidden, handleClick, ...props }) {
  return (
    <Wrapper>
      <LockButton isLocked={isHidden} handleClick={handleClick} {...props}>
        <Text>{`${isHidden ? 'Unlock' : 'Lock'} Review`}</Text>
      </LockButton>
    </Wrapper>
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
