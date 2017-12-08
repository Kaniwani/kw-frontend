import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { compose, branch, renderComponent } from 'recompose';
import shouldUpdateDeepEqual from 'utils/shouldUpdateDeepEqual';

import LoadingCrabigator from 'components/LoadingCrabigator';
import VocabLevel from 'containers/VocabLevel';
import { Ul } from './styles';

VocabLevelsList.propTypes = {
  levelIds: PropTypes.array.isRequired,
};

function VocabLevelsList({ levelIds }) {
  return (
    <Ul>{levelIds.map((id) => <VocabLevel key={cuid()} id={id} />)}</Ul>
  );
}

export default compose(
  branch(({ levelIds }) => !levelIds.length, renderComponent(LoadingCrabigator)),
  shouldUpdateDeepEqual(['levelIds']),
)(VocabLevelsList);
