import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';

import { showModal } from 'containers/Modal/actions';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';
import ReviewBackground from './ReviewBackground';
import Wrapper from './Wrapper';
import InfoWrapper from './InfoWrapper';
import InfoRow from './InfoRow';
import InfoButton from './InfoButton';
import SynonymButton from './SynonymButton';
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
    showSynonymModal: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

  _showSynonymModal = () => {
    const { characters, kana, showSynonymModal } = this.props;
    showSynonymModal({ modalType: 'addSynonym', characters, kana });
  }

  _toggleCharsInfo = () => this.props.toggleInfo({ characters: true })
  _toggleKanaInfo = () => this.props.toggleInfo({ kana: true });

  render() {
    const { characters, kana, isInfoVisible, isCharactersVisible, isKanaVisible } = this.props;
    return (
      <Wrapper>
        {isInfoVisible && (
        <InfoWrapper>
          <SynonymButton
            type="button"
            onClick={this._showSynonymModal}
          >
            Add <strong>S</strong>ynonym
          </SynonymButton>
          <InfoRow>
            <InfoButton
              type="button"
              position="left"
              onClick={this._toggleCharsInfo}
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
              onClick={this._toggleKanaInfo}
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
    showSynonymModal: (options) => dispatch(showModal(options)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInfo);
