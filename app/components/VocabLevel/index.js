import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import noop from 'lodash/noop';
import isNumber from 'lodash/isNumber';
import titleCase from 'voca/title_case';

import actions from 'containers/VocabLevelsPage/actions';
import { makeSelectLevel } from 'containers/VocabLevelsPage/selectors';
import { Wrapper, LevelLink, Title, ItemCount, LockedLabel, Button } from './styles';

const isWithinUserWKLevel = (id, userLevel) => isNumber(id) && id <= userLevel;
const isNotNumberedLevel = (id) => !isNumber(id);

const enhance = compose(
  mapProps(({ userLevel, lockLevel, unlockLevel, level: { id, count, isSubmitting, isLocked } }) => ({
    isActionable: !isSubmitting && (isWithinUserWKLevel(id, userLevel) || isNotNumberedLevel(id)),
    title: isNotNumberedLevel(id) ? titleCase(id) : id,
    id,
    count,
    isLocked,
    isSubmitting,
    lockLevel,
    unlockLevel,
  })),
  withHandlers({
    handleLockClick: ({ id, isActionable, isLocked, lockLevel, unlockLevel }) => {
      if (isActionable && !isLocked) return () => lockLevel(id);
      if (isActionable && isLocked) return () => unlockLevel(id);
      return noop;
    },
  }),
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
        {isActionable && <ItemCount> {count} entries</ItemCount>}
        {isLocked && <LockedLabel>Locked</LockedLabel>}
      </LevelLink>
      <Button
        level={id}
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        isActionable={isActionable}
        handleClick={handleLockClick}
      />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  level: makeSelectLevel(),
});

const mapDispatchToProps = (dispatch) => ({
  lockLevel: (id) => dispatch(actions.locklevel.request({ id })),
  unlockLevel: (id) => dispatch(actions.unlocklevel.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(enhance(VocabLevel));
