import React from 'react';
import PropTypes from 'prop-types';

import { SRS_RANKS } from 'shared/constants';
import RankedVocabList from '../RankedVocabList';

RankedVocabLists.propTypes = {
  items: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

// TODO: memoize splitting items into ranks, then render a RankedVocabList for each rank
function RankedVocabLists({ items, ...props }) {
  return (
    // see frontend SummarySection selector to map items & ranks
    // <RankedVocabList rank={rank} rankedItems={rankedItems} {...props} />
    // temporary
    <RankedVocabList rank="guru" items={items} {...props} />
  );
}

export default RankedVocabLists;
