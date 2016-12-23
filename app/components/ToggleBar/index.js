import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled, { css } from 'styled-components';
import * as COLORS from 'shared/styles/colors';
import { fullWidthBg } from 'shared/styles/utils';
import {
  toggleNewSynonymPanel,
  toggleInfoPanels,
  toggleInfoDepth,
 } from 'containers/ReviewInfo/actions';

import {
  selectInfoAddSynonymVisible,
  selectInfoDetailLevelName,
  selectInfoPanelsVisible,
} from 'containers/ReviewInfo/selectors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgb(${COLORS.white});
  padding: .5rem .4rem;
`;

const Toggle = styled.div`
  text-align: center;
  position: relative;
  font-size: .7rem;
  flex: 0 1 300px;
  cursor: pointer;
  padding: .2rem;
  margin: 0 .2rem;
  background-color: rgb(${COLORS.whiteLight});
  color: rgb(${(props) => (props.active ? COLORS.greyDark : COLORS.greyLight)});
  box-shadow: 1px 1px 0 #e1e1e1, -1px 1px 0 #e1e1e1;
  ${(props) => props.active ? css`
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -10px;
      left: 50%;
      margin-left: -21px;
      border-style: solid;
      border-width: 0 16px 16px 16px;
      border-color: transparent transparent rgb(${COLORS.whiteLight}) transparent;
      z-index: 10;
    }
  ` : ''}
`;

const DetailToggle = styled(Toggle)`
  color: rgb(${COLORS.grey});
`;

function ToggleBar({ _toggleNewSynonymPanel, _toggleInfoPanels, _toggleInfoDepth, showAddSynonym, showPanels, detailLevelName }) {
  return (
    <Wrapper>
      <DetailToggle onClick={_toggleInfoDepth}>Detail: {detailLevelName}</DetailToggle>
      <Toggle active={showPanels} onClick={_toggleInfoPanels}>Info Panel</Toggle>
      <Toggle active={showAddSynonym} onClick={_toggleNewSynonymPanel}>New Synonym</Toggle>
    </Wrapper>
  );
}

ToggleBar.propTypes = {
  _toggleNewSynonymPanel: PropTypes.func.isRequired,
  _toggleInfoPanels: PropTypes.func.isRequired,
  _toggleInfoDepth: PropTypes.func.isRequired,
  detailLevelName: PropTypes.string.isRequired,
  showPanels: PropTypes.bool.isRequired,
  showAddSynonym: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showAddSynonym: selectInfoAddSynonymVisible(),
  detailLevelName: selectInfoDetailLevelName(),
  showPanels: selectInfoPanelsVisible(),
});

const mapDispatchToProps = (dispatch) => ({
  _toggleNewSynonymPanel: () => dispatch(toggleNewSynonymPanel()),
  _toggleInfoPanels: () => dispatch(toggleInfoPanels()),
  _toggleInfoDepth: () => dispatch(toggleInfoDepth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBar);
