import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import cuid from 'cuid';
import ReviewBackground from './ReviewBackground';

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
  width: 100%;
  text-align: center;
`;

const InfoRow = styled.div`
  flex: 1 0 50%;
  background-color: transparent;
`;

/**
 * Sets left and right values based on position prop string: 'left' or 'right';
 * @param {any} left  Value to set if this.props.position is 'left'
 * @param {any} right  Value to set if this.props.position is 'right'
 * @return {Function} Function waiting to receive `this.props`
 */
const setLeftRight = (left, right) => ({ position }) => (position === 'left' ? left : right);

const Entry = styled.p`
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
  render() {
    const { characters, kana, isInfoVisible, isCharactersVisible, isKanaVisible } = this.props;
    return (
      <Wrapper>
        {/* // add synonym button */}
        {isInfoVisible && (
          <InfoWrapper>
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
          </InfoWrapper>
        )}
        <ReviewBackground />
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
