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
  selectInfoFullDetails,
  selectInfoPanelsVisible,
} from './selectors';

export const ReviewInfo = ({ readings, showToggleBar, showPanels, showAddSynonym, fullDetails }) => (
  <Wrapper >
    { showToggleBar && <ToggleBar />}
    { showPanels && <InfoPanel fullDetails={fullDetails} item={readings.first()} category="Main" /> }
    { showPanels && readings.slice(1).map((reading) =>
      <InfoPanel fullDetails={fullDetails} key={cuid()} item={reading} category="Synonym" />) }
    { showAddSynonym && <AddSynonymPanel addPadding={fullDetails} /> }
  </Wrapper>
);

ReviewInfo.propTypes = {
  fullDetails: PropTypes.bool.isRequired,
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  showPanels: PropTypes.bool.isRequired,
  showAddSynonym: PropTypes.bool.isRequired,
  showToggleBar: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fullDetails: selectInfoFullDetails(),
  showAddSynonym: selectInfoAddSynonymVisible(),
  showPanels: selectInfoPanelsVisible(),
});

export default connect(mapStateToProps)(ReviewInfo);
