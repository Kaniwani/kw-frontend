import React from 'react';
// import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';

import { PanelWrapper } from '../styles';
// import Readings from './Readings';
// import { Synonyms } from './Synonyms';

InfoPanel.propTypes = {
  // reviewEntry: PropTypes.object.isRequired,
  // detailLevel: PropTypes.string.isRequired,
};

function InfoPanel(/* {
  detailLevel,
  reviewEntry: {
    id,
    vocabulary: {
      readings,
      synonyms,
    },
  },
}*/) {
  // FIXME: padding adjustments at this stage using detailLevel, not lower!
  return (
    <PanelWrapper>
      info go here
      {/* <Readings reviewId={id} entries={readings} /> */}
      {/* <Synonyms reviewId={id} entries={synonyms} /> */}
    </PanelWrapper>
  );
}

const hideIfNotActive = branch(({ isActive }) => !isActive, renderNothing);

export default hideIfNotActive(InfoPanel);
