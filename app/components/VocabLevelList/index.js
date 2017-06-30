import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import VocabLevel from 'components/VocabLevel';

import { Ul } from './styles';

VocabLevelList.propTypes = {
  levels: PropTypes.array,
  userWKLevel: PropTypes.number.isRequired,
  handleLevelLock: PropTypes.func.isRequired,
};

function VocabLevelList({ levels, userWKLevel, handleLevelLock }) {
  return (
    <Ul>
      {levels.map(({ level, unlocked, count }) => (
        <VocabLevel
          key={cuid()}
          level={level}
          count={count}
          isActionable={level <= userWKLevel}
          isLocked={!unlocked}
          handleLevelLock={handleLevelLock}
        />
      ))}
    </Ul>
  );
}

export default VocabLevelList;
