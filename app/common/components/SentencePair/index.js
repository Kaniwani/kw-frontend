import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectWord,
  selectPrimaryReading,
  selectSentenceEn,
  selectSentenceJa,
  selectVerbType,
} from 'features/vocab/selectors';

import P from 'common/components/P';
import MarkedSentence from './MarkedSentence';
import RevealSentence from './RevealSentence';
import { Wrapper } from './styles';

SentencePair.propTypes = {
  word: PropTypes.string.isRequired,
  primaryReading: PropTypes.string.isRequired,
  sentenceEn: PropTypes.string,
  sentenceJa: PropTypes.string,
  verbType: PropTypes.string,
};

SentencePair.defaultProps = {
  sentenceEn: '',
  sentenceJa: '',
  verbType: '',
};

export function SentencePair({ word, primaryReading, sentenceEn, sentenceJa, verbType }) {
  const hasData = sentenceEn && sentenceJa;
  return hasData ? (
    <Wrapper>
      <MarkedSentence
        sentence={sentenceJa}
        word={word}
        reading={primaryReading}
        verbType={verbType}
      />
      <RevealSentence sentence={sentenceEn} />
    </Wrapper>
  ) : (
    <Wrapper>
      <P>No sentence data found.</P>
    </Wrapper>
  );
}

const mapStateToProps = (state, props) => ({
  word: selectWord(state, props),
  primaryReading: selectPrimaryReading(state, props),
  sentenceEn: selectSentenceEn(state, props),
  sentenceJa: selectSentenceJa(state, props),
  verbType: selectVerbType(state, props),
});

export default connect(mapStateToProps)(SentencePair);
