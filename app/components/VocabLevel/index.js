import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, pure } from 'recompose';
import noop from 'lodash/noop';

import actions from 'containers/App/actions';
import {
  makeSelectLevelCount,
  makeSelectLevelTitle,
  makeSelectLevelLocked,
 } from 'containers/App/selectors';

import {
   makeSelectLevelActionable,
   makeSelectLevelSubmitting,
 } from 'containers/VocabLevelsPage/selectors';

import { Wrapper, LevelLink, Title, ItemCount, LockedLabel, Button } from './styles';


const enhance = compose(
  withHandlers({
    handleLockClick: ({ id, isActionable, isLocked, lockLevel, unlockLevel }) => () => {
      if (isActionable && !isLocked) return lockLevel({ id });
      if (isActionable && isLocked) return unlockLevel({ id });
      return noop;
    },
  }),
  pure,
);

VocabLevel.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  count: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isActionable: PropTypes.bool.isRequired,
  handleLockClick: PropTypes.func.isRequired,
};

function VocabLevel({ id, title, count, isLocked, isSubmitting, isActionable, handleLockClick }) {
  return (
    <Wrapper
      isLocked={isLocked}
      isSubmitting={isSubmitting}
      isActionable={isActionable}
    >
      <LevelLink
        plainLink
        to={`/vocabulary/levels/${id}`}
      >
        <Title>{title}</Title>
        <ItemCount>{count} entries</ItemCount>
        <LockedLabel>{(isSubmitting && 'Syncing') || (isLocked && 'Locked')}</LockedLabel>
      </LevelLink>
      <Button
        id={id}
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        isActionable={isActionable}
        handleClick={handleLockClick}
      />
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  title: makeSelectLevelTitle(id)(state),
  count: makeSelectLevelCount(id)(state),
  isLocked: makeSelectLevelLocked(id)(state),
  isActionable: makeSelectLevelActionable(id)(state),
  isSubmitting: makeSelectLevelSubmitting(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  lockLevel: (payload) => dispatch(actions.level.lock.request(payload)),
  unlockLevel: (payload) => dispatch(actions.level.unlock.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(enhance(VocabLevel));
