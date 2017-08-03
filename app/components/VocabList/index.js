import React from 'react';
import { compose, branch, renderComponent } from 'recompose';

import LoadingCrabigator from 'components/LoadingCrabigator';
import VocabCardList from 'components/VocabCardList';
import VocabChipList from 'components/VocabChipList';

const enhance = compose(
  branch(
    ({ ids, prevLoaded }) => !prevLoaded && (ids && !ids.length),
    renderComponent(LoadingCrabigator),
    branch(
      ({ isExpanded }) => isExpanded,
      renderComponent(VocabCardList),
      renderComponent(VocabChipList),
    ),
  ),
);

const VocabList = enhance((props) => <div {...props} />);

export default VocabList;
