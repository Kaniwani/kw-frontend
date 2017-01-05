import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Wrapper, Toggle, DetailToggle } from './styles';

import {
  toggleNewSynonymPanel,
  toggleInfoPanels,
  toggleInfoDepth,
 } from 'containers/ReviewInfo/actions';

import { selectAnswerMarked } from 'containers/AnswerInput/selectors';

import {
  selectInfoAddSynonymVisible,
  selectInfoDetailLevelName,
  selectInfoPanelsVisible,
} from 'containers/ReviewInfo/selectors';

function ToggleBar({
  _toggleNewSynonymPanel,
  _toggleInfoPanels,
  _toggleInfoDepth,
  isAddSynonymVisible,
  isPanelsVisible,
  isAnswerMarked,
  detailLevelName,
}) {
  return (
    <Wrapper>
      <DetailToggle
        className={(!isAnswerMarked && 'is-disabled')}
        onClick={_toggleInfoDepth}
      >
        Detail: {detailLevelName}
      </DetailToggle>
      <Toggle
        className={(!isAnswerMarked && 'is-disabled') || (isPanelsVisible && 'is-active')}
        onClick={_toggleInfoPanels}
      >
        Info Panel
      </Toggle>
      <Toggle
        className={(!isAnswerMarked && 'is-disabled') || (isAddSynonymVisible && 'is-active')}
        onClick={_toggleNewSynonymPanel}
      >
        New Synonym
      </Toggle>
    </Wrapper>
  );
}

ToggleBar.propTypes = {
  _toggleNewSynonymPanel: PropTypes.func.isRequired,
  _toggleInfoPanels: PropTypes.func.isRequired,
  _toggleInfoDepth: PropTypes.func.isRequired,
  detailLevelName: PropTypes.string.isRequired,
  isAddSynonymVisible: PropTypes.bool.isRequired,
  isPanelsVisible: PropTypes.bool.isRequired,
  isAnswerMarked: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAnswerMarked: selectAnswerMarked(),
  isAddSynonymVisible: selectInfoAddSynonymVisible(),
  isPanelsVisible: selectInfoPanelsVisible(),
  detailLevelName: selectInfoDetailLevelName(),
});

const mapDispatchToProps = (dispatch) => ({
  _toggleNewSynonymPanel: () => dispatch(toggleNewSynonymPanel()),
  _toggleInfoPanels: () => dispatch(toggleInfoPanels()),
  _toggleInfoDepth: () => dispatch(toggleInfoDepth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBar);
