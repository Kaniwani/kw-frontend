import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, LevelLink, Title, ItemCount, LockedLabel, Button } from './styles';

VocabLevel.propTypes = {
  level: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  handleLockClick: PropTypes.func.isRequired,
};

function VocabLevel({
  level,
  count,
  isActionable,
  isSubmitting,
  isLocked,
  handleLockClick,
}) {
  return (
    <Wrapper
      isActionable={isActionable}
      isLocked={isLocked}
      isSubmitting={isSubmitting}
    >
      <LevelLink
        plainLink
        to={`/vocabulary/level/${level}`}
      >
        <Title>Level {level}</Title>
        {isActionable && <ItemCount> {count} entries</ItemCount>}
        {isLocked && <LockedLabel>Locked</LockedLabel>}
      </LevelLink>
      <Button
        level={level}
        isSubmitting={isSubmitting}
        isActionable={isActionable}
        isLocked={isLocked}
        handleClick={handleLockClick}
      />
    </Wrapper>
  );
}

export default VocabLevel;
