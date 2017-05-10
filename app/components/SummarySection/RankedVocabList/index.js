import React from 'react';
import PropTypes from 'prop-types';
import titlecase from 'voca/title_case';

import { SRS_RANKS } from 'shared/constants';
import StripeHeading from 'components/StripeHeading';
import VocabList from '../VocabList';

RankedVocabList.propTypes = {
  rank: PropTypes.oneOf(Object.keys(SRS_RANKS)).isRequired,
  items: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

function RankedVocabList({ rank, items, type, color, expanded }) {
  return (
    <div>
      {items.length > 0 && <StripeHeading text={titlecase(rank)} count={items.length} />}
      <VocabList expanded={expanded} items={items} color={color} type={type} />
    </div>
  );
}

export default RankedVocabList;
