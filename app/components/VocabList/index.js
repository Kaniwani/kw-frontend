import React from 'react';
import { compose, branch, renderComponent } from 'recompose';

import LoadingCrabigator from 'components/LoadingCrabigator';
import VocabCardList from 'components/VocabCardList';
import VocabChipList from 'components/VocabChipList';

const noIds = ({ ids }) => !ids.length;
const expandedCards = ({ isExpanded }) => isExpanded;
const enhance = compose(
  branch(
    noIds,
    renderComponent(LoadingCrabigator),
    branch(
      expandedCards,
      renderComponent(VocabCardList),
      renderComponent(VocabChipList),
    ),
  ),
);

const VocabList = enhance((props) => <div {...props} />);

export default VocabList;
