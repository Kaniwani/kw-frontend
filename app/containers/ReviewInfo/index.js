import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';

import { toggleVocabInfo } from 'containers/ReviewInfo/actions';
import ReviewBackground from './ReviewBackground';
import Wrapper from './Wrapper';
import InfoWrapper from './InfoWrapper';
import InfoRow from './InfoRow';
import InfoButton from './InfoButton';
import Entry from './Entry';

import {
  selectCharacters,
  selectKana,
  selectInfoVisible,
  selectCharactersVisible,
  selectKanaVisible,
} from './selectors';

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
