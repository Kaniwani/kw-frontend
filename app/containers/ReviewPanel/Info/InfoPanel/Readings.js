import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { DETAIL_LEVELS } from '../constants';
import Reading from './Reading';

Readings.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
  detailLevel: PropTypes.oneOf(Object.values(DETAIL_LEVELS)),
  reviewId: PropTypes.string.isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
};

// NOTE: this should apply the same to synonyms pretty much since the header is now separate

function Readings({ detailLevel, reviewId, entries }) {
  return entries.map((entry) => (
    <Reading
      key={cuid()}
      readingEntry={entry}
      reviewId={reviewId}
      detailLevel={detailLevel}
    />
  ));
}

export default Readings;
