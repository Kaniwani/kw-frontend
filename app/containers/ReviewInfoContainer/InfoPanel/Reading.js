import React from 'react';
import PropTypes from 'prop-types';

import Divider from 'components/Divider';
import ReadingDetail from 'components/ReadingDetail';
import SentencePair from 'components/SentencePair';

import { DETAIL_LEVELS } from 'shared/constants';
import { PanelWrapper } from './styles';
import ReadingHeader from './ReadingHeader';

// really need DetailLevel to be from a selector imo
const isNotLowDetail = detailLevel => detailLevel !== DETAIL_LEVELS.LOW;
const isHighDetail = detailLevel => detailLevel === DETAIL_LEVELS.HIGH;

Reading.propTypes = {
  detailLevel: PropTypes.oneOf(Object.values(DETAIL_LEVELS)),
  sentence: PropTypes.object.isRequired,
  character: PropTypes.string.isRequired,
  kana: PropTypes.array.isRequired,
};

Reading.defaultProps = {
  detailLevel: DETAIL_LEVELS.MEDIUM,
};

function Reading({ detailLevel, sentence, character, kana }) {
  return (
    <PanelWrapper>
      {isNotLowDetail(detailLevel) && <ReadingHeader />}
      <ReadingDetail detailLevel={detailLevel} character={character} kana={kana} />
      {isHighDetail(detailLevel) && sentence && <Divider fade />}
      {isHighDetail(detailLevel) && sentence && (
        <SentencePair sentenceEN={sentence.en} sentenceJA={sentence.ja} character={character} kana={kana} />
      )}
    </PanelWrapper>
  );
}

export default Reading;
