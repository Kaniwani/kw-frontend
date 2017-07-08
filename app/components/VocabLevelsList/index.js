import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { compose, branch, renderNothing, shouldUpdate } from 'recompose';

import VocabLevel from 'components/VocabLevel';
import { Ul } from './styles';

VocabLevelsList.propTypes = {
  levels: PropTypes.array.isRequired,
};

const enhance = compose(
  branch(
    ({ levels }) => levels.length < 0,
    renderNothing
  ),
  shouldUpdate((props, nextProps) => props.levels.length !== nextProps.levels.length),
);

function VocabLevelsList({ levels }) {
  return (
    <Ul>
      {levels.map((id) => <VocabLevel key={cuid()} id={id} />)}
    </Ul>
  );
}

export default enhance(VocabLevelsList);
