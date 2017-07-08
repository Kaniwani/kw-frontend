import React from 'react';
import { compose, branch, renderNothing, renderComponent } from 'recompose';

import VocabCardList from 'components/VocabCardList';
import VocabChipList from 'components/VocabChipList';

const enhance = compose(
  branch(
    ({ ids }) => ids.length <= 0,
    renderNothing,
    branch(
      ({ isExpanded }) => isExpanded,
      renderComponent(VocabCardList),
      renderComponent(VocabChipList),
    )
  ),
);

const VocabList = enhance((props) => <div {...props} />);

export default VocabList;
