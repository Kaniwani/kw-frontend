import React from 'react';

import { branch, renderComponent } from 'recompose';
import VocabCardList from 'components/VocabCardList';
import VocabChipList from 'components/VocabChipList';

import Placeholder from '../Placeholder';

const hasNoItems = ({ items }) => !items.length;

const withPlaceholder = branch(
  hasNoItems,
  renderComponent(Placeholder),
);

const CardList = withPlaceholder(VocabCardList);
const ChipList = withPlaceholder(VocabChipList);

const enhance = branch(
  ({ expanded }) => expanded,
  renderComponent(CardList),
  renderComponent(ChipList),
);

const VocabList = enhance((props) => <div {...props} />);

export default VocabList;
