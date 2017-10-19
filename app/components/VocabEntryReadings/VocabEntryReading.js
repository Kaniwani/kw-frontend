import React from 'react';
import PropTypes from 'prop-types';

import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import Reading from 'components/Reading';
import KanjiStrokeLoader from 'components/KanjiStrokeLoader';
import TagsList from 'components/TagsList';
import PitchDiagram from 'components/PitchDiagram';
import { Li } from './styles';

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
      <Reading character={character} kana={kana} />
      <TagsList tags={tags} />
      <SentencePair
        sentenceEn={sentenceEn}
        sentenceJa={sentenceJa}
        character={character}
        kana={kana}
      />
      {/* FIXME: hard-coded pitch */}
      <PitchDiagram reading={kana[0]} pitchNum={0} />
      <KanjiStrokeLoader character={character} />
      <ReadingLinks character={character} />
    </Li>
  );
}

export default VocabEntryReading;
