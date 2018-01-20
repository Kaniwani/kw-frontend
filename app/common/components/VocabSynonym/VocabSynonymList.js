import React from 'react';
import PropTypes from 'prop-types';

import VocabSynonym from 'common/components/VocabSynonym/VocabSynonym';
import Element from 'common/components/Element';

VocabSynonymList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  reviewId: PropTypes.number.isRequired,
};

export function VocabSynonymList({ ids, reviewId }) {
  return (
    <Element flexRow>
      {ids.map((id) => <VocabSynonym key={id} id={id} reviewId={reviewId} />)}
    </Element>
  );
}

export default VocabSynonymList;
