import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, LevelLink, Title, Text, ItemCount, Button } from './styles';

VocabLevel.propTypes = {
  level: PropTypes.number.isRequired,
  count: PropTypes.number,
  handleLevelLock: PropTypes.func.isRequired,
  isActionable: PropTypes.bool,
  isLocked: PropTypes.bool,
};

VocabLevel.defaultProps = {
  count: 0,
  isActionable: false,
  isLocked: true,
};

function VocabLevel({ level, count, isActionable, isLocked, handleLevelLock }) {
  return (
    <Wrapper isActionable={isActionable}>
      <LevelLink to={`/vocabulary/level/${level}`} plainLink>
        <Title>
          <Text isActionable={isActionable}>Level {level}</Text>
          {isActionable && <ItemCount> {count} entries</ItemCount>}
        </Title>
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
