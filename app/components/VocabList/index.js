import React from 'react';
import { compose, branch, renderComponent } from 'recompose';

import LoadingIndicator from 'components/LoadingIndicator';
import VocabCardList from 'components/VocabCardList';
import VocabChipList from 'components/VocabChipList';

const noIds = ({ ids }) => ids.length <= 0;
const expandedCards = ({ isExpanded }) => isExpanded;
const enhance = compose(
  branch(
    noIds,
    renderComponent(LoadingIndicator),
    branch(
      expandedCards,
      renderComponent(VocabCardList),
      renderComponent(VocabChipList),
    ),
  ),
);

const VocabList = enhance((props) => <div {...props} />);

export default VocabList;
