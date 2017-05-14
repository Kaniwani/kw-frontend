import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import VocabLevel from 'components/VocabLevel';

import { Ul } from './styles';

VocabLevelList.propTypes = {
  levels: PropTypes.array.isRequired,
  userWKLevel: PropTypes.number.isRequired,
};

function VocabLevelList({ levels, userWKLevel }) {
  return (
    <Ul>
      {levels.map(({ level, unlocked, count }) => (
        <VocabLevel
          key={cuid()}
          level={level}
          count={count}
          isActionable={level <= userWKLevel}
          isLocked={!unlocked}
          handleLevelLock={(event) => console.log('FIXME: bind level before passing to VocabLevel', event)}
        />
      ))}
    </Ul>
  );
}

export default VocabLevelList;
