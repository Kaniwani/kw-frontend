import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, pure } from 'recompose';
import { noop } from 'lodash';

import actions from 'containers/App/actions';
import {
  makeSelectLevelTitle,
  makeSelectLevelLocked,
  makeSelectLevelVocabCount,
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
  isLocked: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isActionable: PropTypes.bool.isRequired,
  handleLockClick: PropTypes.func.isRequired,
  vocabCount: PropTypes.number.isRequired,
};

function VocabLevel({ id, title, vocabCount, isLocked, isSubmitting, isActionable, handleLockClick }) {
  return (
    <Wrapper
      isLocked={isLocked}
      isSubmitting={isSubmitting}
      isActionable={isActionable}
    >
      <LevelLink plainLink to={`/vocabulary/levels/${id}`}>
        <Title>{title}</Title>
        <ItemCount>{vocabCount} entries</ItemCount>
        <LockedLabel>{(isSubmitting && 'Syncing') || (isLocked && 'Locked')}</LockedLabel>
      </LevelLink>
      <Button
        id={id}
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        isActionable={isActionable}
        onClick={handleLockClick}
      />
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  title: makeSelectLevelTitle(id)(state),
  isLocked: makeSelectLevelLocked(id)(state),
  isActionable: makeSelectLevelActionable(id)(state),
  isSubmitting: makeSelectLevelSubmitting(id)(state),
  vocabCount: makeSelectLevelVocabCount(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  lockLevel: (payload) => {
    window.confirm('This will reset your KW SRS for this level. Are you sure you want to continue?') ? dispatch(actions.level.lock.request(payload)) : noop(); // eslint-disable-line no-unused-expressions
  },
  unlockLevel: (payload) => dispatch(actions.level.unlock.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(enhance(VocabLevel));
