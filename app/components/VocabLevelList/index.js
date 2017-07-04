import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { branch, renderNothing } from 'recompose';
import cuid from 'cuid';

import VocabLevel from 'components/VocabLevel';
import { Ul } from './styles';

const enhance = branch(
  ({ levels, userLevel }) => !levels.length || !userLevel,
  renderNothing,
);

VocabLevelList.propTypes = {
  levels: PropTypes.array.isRequired,
  userLevel: PropTypes.number.isRequired,
  handleLockLevel: PropTypes.func.isRequired,
  handleUnlockLevel: PropTypes.func.isRequired,
};

function VocabLevelList({ levels, userLevel, handleLockLevel, handleUnlockLevel }) {
  const isWithinUserWKLevel = (level) => isNumber(level) && level <= userLevel;
  const isSrsOrCustomLevel = (level) => isString(level);
  const isActionable = (level) => isWithinUserWKLevel(level) || isSrsOrCustomLevel(level);

  return (
    <Ul>
      {levels.map(({ level, unlocked, submitting, count }) => (
        <VocabLevel
          key={cuid()}
          level={level}
          count={count}
          isLocked={!unlocked}
          isSubmitting={submitting}
          isActionable={isActionable(level)}
          handleLockClick={(isActionable(level) && unlocked) ? handleLockLevel(level) : handleUnlockLevel(level)}
        />
      ))}
    </Ul>
  );
}

export default enhance(VocabLevelList);
