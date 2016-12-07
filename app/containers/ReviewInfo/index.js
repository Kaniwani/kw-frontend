import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import cuid from 'cuid';
import {
  selectCharacters,
  selectKana,
  selectInfoVisible,
  selectCharactersVisible,
  selectKanaVisible,
} from './selectors';

const Wrapper = styled.div`
  display: flex;
  text-align: center;
`;

const InfoRow = styled.div`
  flex: 1 0 50%;
`;

// TODO: inset 2px ... if left -2px ... if right
const Entry = styled.p`
  box-shadow: inset -2px 0 10px -2px rgba(77,77,77,.15);
  background-color: hsla(0,0%,94%,.95);
  padding: 10px 15px;
  font-size: calc(26px + 24 * ((100vw - 300px) / 1700));
  line-height: 1.5;
  margin: 0;
`;

const InfoButton = styled.button`
  width: 100%;
  padding: .75em 1.5em;
  border: 1px solid #ababab;
  border-radius: 0;
  border-left-width: ${({ position }) => (position === 'left' ? 0 : 1)}px;
  border-right-width: ${({ position }) => (position === 'right' ? 0 : 1)}px;
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
  render() {
    const { characters, kana, isInfoVisible, isCharactersVisible, isKanaVisible } = this.props;
    if (!isInfoVisible) return null;
    return (
      // add synonym button
      <Wrapper>
        <InfoRow>
          <InfoButton type="button" position="left"><strong>K</strong>anji</InfoButton>
          {isCharactersVisible && characters.map((entry) =>
            <Entry lang="ja" key={cuid()}>{entry}</Entry>,
          )}
        </InfoRow>
        <InfoRow>
          <InfoButton type="button" position="right"><strong>P</strong>honetic</InfoButton>
          {isKanaVisible && kana.map((entry) =>
            <Entry lang="ja" key={cuid()}>{entry}</Entry>,
          )}
        </InfoRow>
      </Wrapper>
    );
  }
}

ReviewInfo.propTypes = {
  characters: PropTypes.array,
  kana: PropTypes.array,
  isInfoVisible: PropTypes.bool,
  isCharactersVisible: PropTypes.bool.isRequired,
  isKanaVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  characters: selectCharacters(),
  kana: selectKana(),
  isInfoVisible: selectInfoVisible(),
  isCharactersVisible: selectCharactersVisible(),
  isKanaVisible: selectKanaVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInfo);
