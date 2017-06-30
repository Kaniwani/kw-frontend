import React from 'react';
import { branch, renderComponent } from 'recompose';

import VocabCardList from 'components/VocabCardList';
import VocabChipList from 'components/VocabChipList';

const enhance = branch(
  ({ isExpanded }) => isExpanded,
  renderComponent(VocabCardList),
  renderComponent(VocabChipList),
);

const VocabList = enhance((props) => <div {...props} />);

export default VocabList;
