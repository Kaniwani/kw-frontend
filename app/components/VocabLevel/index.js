import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, LevelLink, Title, Button } from './styles';

VocabLevel.propTypes = {
  level: PropTypes.number.isRequired,
  handleLevelLock: PropTypes.func.isRequired,
  isActionable: PropTypes.bool,
  isLocked: PropTypes.bool,
};

VocabLevel.defaultProps = {
  isActionable: false,
  isLocked: true,
};

function VocabLevel({ level, isActionable, isLocked, handleLevelLock }) {
  return (
    <Wrapper isActionable={isActionable}>
      <LevelLink
        to={`/vocabulary/level/${level}`}
        title={`View level ${level} vocabulary`}
      >
        <Title>Level {level}</Title>
      </LevelLink>
      <Button
        isActionable={isActionable}
        isLocked={isLocked}
        title={isLocked ? `Unlock level ${level}` : `Lock level ${level}`}
        handleClick={handleLevelLock}
      />
    </Wrapper>

  );
}


export default VocabLevel;
