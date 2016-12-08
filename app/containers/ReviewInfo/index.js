import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { fluidType, setLeftRight } from 'shared/styles/utils';
import cuid from 'cuid';
import ReviewBackground from './ReviewBackground';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';

import {
  selectCharacters,
  selectKana,
  selectInfoVisible,
  selectCharactersVisible,
  selectKanaVisible,
} from './selectors';

const Wrapper = styled.div`
  display: table-row;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  position: absolute;
  overflow: hidden;
  width: 100%;
  text-align: center;
  z-index: 1;
`;

const InfoRow = styled.div`
  flex: 1 0 50%;
  background-color: transparent;
`;

const Entry = styled.p`
  background-color: hsla(0,0%,94%,.95);
  padding: 10px 15px;
  ${fluidType(26, 50, 300, 2000)}
  line-height: 1.5;
  margin: 0;
`;

const InfoButton = styled.button`
  width: 100%;
  padding: .75em 1.5em;
  border: 1px solid #ababab;
  border-radius: 0;
  border-left-width: ${setLeftRight(0, 1)}px;
  border-right-width: ${setLeftRight(1, 0)}px;
  background-color: rgba(97,97,97,.9);
  color: #f0f0f0;
  cursor: pointer;
  -webkit-appearance: none;
  outline: 0;
  transition: all .2s ease-out;
  &:hover {
    background-color: #616161;
  }
`;

export class ReviewInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    characters: PropTypes.object,
    kana: PropTypes.object,
    isInfoVisible: PropTypes.bool,
    isCharactersVisible: PropTypes.bool.isRequired,
    isKanaVisible: PropTypes.bool.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

  render() {
    const { characters, kana, isInfoVisible, isCharactersVisible, isKanaVisible, toggleInfo } = this.props;
    return (
      <Wrapper>
        {/* // add synonym button */}
        {isInfoVisible && (
          <InfoWrapper>
            <InfoRow>
              <InfoButton
                type="button"
                position="left"
                onClick={() => { toggleInfo({ characters: true }); }}
              >
                <strong>K</strong>anji
              </InfoButton>
              {isCharactersVisible && characters.map((entry) =>
                <Entry lang="ja" key={cuid()}>{entry}</Entry>,
              )}
            </InfoRow>
            <InfoRow>
              <InfoButton
                type="button"
                position="left"
                onClick={() => { toggleInfo({ kana: true }); }}
              >
                <strong>P</strong>honetic
              </InfoButton>
              {isKanaVisible && kana.map((entry) =>
                <Entry lang="ja" key={cuid()}>{entry}</Entry>,
              )}
            </InfoRow>
          </InfoWrapper>
        )}
        <ReviewBackground />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  characters: selectCharacters(),
  kana: selectKana(),
  isInfoVisible: selectInfoVisible(),
  isCharactersVisible: selectCharactersVisible(),
  isKanaVisible: selectKanaVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleInfo: (options) => dispatch(toggleVocabInfo(options)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInfo);
