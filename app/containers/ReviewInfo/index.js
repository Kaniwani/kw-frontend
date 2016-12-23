import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';
import InfoPanel from './InfoPanel';
import { Wrapper } from './UI';
import ToggleBar from 'components/ToggleBar';
import AddSynonymPanel from './AddSynonymPanel';
import {
  selectInfoAddSynonymVisible,
  selectInfoDetailLevel,
  selectInfoPanelsVisible,
} from './selectors';

export const ReviewInfo = ({ readings, showToggleBar, showPanels, showAddSynonym, detailLevel }) => (
  <Wrapper >
    { showToggleBar && <ToggleBar />}
    { !showAddSynonym && showPanels && <InfoPanel detailLevel={detailLevel} item={readings.first()} category="Main" /> }
    { !showAddSynonym && showPanels && readings.slice(1).map((reading) =>
      <InfoPanel detailLevel={detailLevel} key={cuid()} item={reading} category="Synonym" />) }
    { showAddSynonym && <AddSynonymPanel addPadding={detailLevel > 2} /> }
  </Wrapper>
);

ReviewInfo.propTypes = {
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  showToggleBar: PropTypes.bool.isRequired,
  showAddSynonym: PropTypes.bool.isRequired,
  detailLevel: PropTypes.number.isRequired,
  showPanels: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showAddSynonym: selectInfoAddSynonymVisible(),
  detailLevel: selectInfoDetailLevel(),
  showPanels: selectInfoPanelsVisible(),
});

export default connect(mapStateToProps)(ReviewInfo);
