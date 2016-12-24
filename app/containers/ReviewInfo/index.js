import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfoPanel from './InfoPanel';
import { Wrapper } from './UI';
import AddSynonymPanel from './AddSynonymPanel';
import {
  selectInfoAddSynonymVisible,
  selectInfoDetailLevel,
  selectInfoPanelsVisible,
} from './selectors';

export const ReviewInfo = ({ readings, synonyms, isPanelsVisible, isAddSynonymVisible, detailLevel }) => {
  let content = null;
  console.log(isPanelsVisible, isAddSynonymVisible);
  if (isPanelsVisible) {
    content = (
      <Wrapper>
        {readings && <InfoPanel detailLevel={detailLevel} items={readings} category="Reading" />}
        {synonyms && <InfoPanel detailLevel={detailLevel} items={synonyms} category="Synonym" />}
      </Wrapper>
    );
  }
  if (isAddSynonymVisible) {
    content = (
      <Wrapper>
        <AddSynonymPanel addPadding={detailLevel > 2} />
      </Wrapper>
    );
  }
  return content;
};

ReviewInfo.propTypes = {
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  synonyms: PropTypes.instanceOf(Immutable.Iterable),
  isAddSynonymVisible: PropTypes.bool.isRequired,
  detailLevel: PropTypes.number.isRequired,
  isPanelsVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAddSynonymVisible: selectInfoAddSynonymVisible(),
  detailLevel: selectInfoDetailLevel(),
  isPanelsVisible: selectInfoPanelsVisible(),
});

export default connect(mapStateToProps)(ReviewInfo);
