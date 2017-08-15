import React from 'react';
import PropTypes from 'prop-types';

import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import Reading from 'components/Reading';
import KanjiStroke from 'components/KanjiStroke';
import TagsList from 'components/TagsList';

import { Li, ReadingContent, StrokeContent } from './styles';

VocabEntryReading.propTypes = {
  character: PropTypes.string.isRequired,
  kana: PropTypes.arrayOf(PropTypes.string).isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function VocabEntryReading({
  character,
  kana,
  sentenceEn,
  sentenceJa,
  tags,
}) {
  return (
    <Li>
      <ReadingContent>
        <Reading character={character} kana={kana} />
        <TagsList tags={tags} />
        <SentencePair
          sentenceEn={sentenceEn}
          sentenceJa={sentenceJa}
          character={character}
          kana={kana}
        />
        <ReadingLinks character={character} />
      </ReadingContent>
      <StrokeContent>
        <KanjiStroke settings={{ autoplay: false }} character={character} />
      </StrokeContent>
    </Li>
  );
}

export default VocabEntryReading;
