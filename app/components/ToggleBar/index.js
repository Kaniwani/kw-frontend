import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { whiteLight, greyLight, grey, greyDark } from 'shared/styles/colors';
import { siteMaxWidth } from 'shared/styles/sizing';
import { milli } from 'shared/styles/typography';
import { media } from 'shared/styles/media';
import { shadowBox } from 'shared/styles/shadows';
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

const Wrapper = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;
  justify-content: center;
  background-color: transparent;
  padding: 0 .4rem .4rem;
  width: 100%;
  z-index: 2;
  ${media('min').sm`
    padding-left: .5rem;
    padding-right: .5rem;
    max-width: ${siteMaxWidth}px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

const Toggle = styled.li`
  text-align: center;
  position: relative;
  ${milli}
  flex: 0 1 300px;
  cursor: pointer;
  padding: .2rem;
  margin: 0 .2rem;
  ${shadowBox}
  background-color: ${whiteLight};
  color: ${greyLight};
  &.is-active {
    color: ${greyDark};
    /* Triangle pointer */
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -.6rem;
      left: 50%;
      margin-left: -.9rem;
      border-style: solid;
      border-width: 0 .8rem .8rem .8rem;
      border-color: transparent transparent ${whiteLight} transparent;
      z-index: 10;
    }
  }
  &.is-disabled {
    opacity: .7;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const DetailToggle = styled(Toggle)`
  color: ${grey};
`;

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
