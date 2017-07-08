import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, pure, withHandlers, shouldUpdate } from 'recompose';
import { createStructuredSelector } from 'reselect';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';

import actions from 'containers/App/actions';
import {
  selectLevelCount,
  selectLevelTitle,
  selectLevelLocked,
  selectLevelActionable,
  selectLevelSubmitting,
 } from 'containers/App/selectors';
import { Wrapper, LevelLink, Title, ItemCount, LockedLabel, Button } from './styles';


const enhance = compose(
  withHandlers({
    handleLockClick: ({ id, isActionable, isLocked, lockLevel, unlockLevel }) => () => {
      if (isActionable && !isLocked) return lockLevel({ id });
      if (isActionable && isLocked) return unlockLevel({ id });
      return noop;
    },
  }),
  // pure,
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
        to={`/vocabulary/level/${id}`}
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

const mapStateToProps = createStructuredSelector({
  title: selectLevelTitle,
  count: selectLevelCount,
  isLocked: selectLevelLocked,
  isActionable: selectLevelActionable,
  isSubmitting: selectLevelSubmitting,
});

const mapDispatchToProps = (dispatch) => ({
  lockLevel: (payload) => dispatch(actions.level.lock.request(payload)),
  unlockLevel: (payload) => dispatch(actions.level.unlock.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(enhance(VocabLevel));
