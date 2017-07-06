import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderNothing, shouldUpdate } from 'recompose';
import cuid from 'cuid';

import VocabLevel from 'components/VocabLevel';
import { Ul } from './styles';

const enhance = compose(
  branch(
    ({ levels, userLevel }) => !levels.length || !userLevel,
    renderNothing,
  ),
  shouldUpdate(({ levels }, nextProps) => (levels.length !== nextProps.levels.length)),
);

VocabLevelList.propTypes = {
  levels: PropTypes.array.isRequired,
  userLevel: PropTypes.number.isRequired,
};

function VocabLevelList({ levels, userLevel }) {
  return (
    <Ul>
      {levels.map((id) =>
        <VocabLevel key={cuid()} id={id} userLevel={userLevel} />
      )}
    </Ul>
  );
}

export default enhance(VocabLevelList);
