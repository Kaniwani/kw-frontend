import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import Ruby from 'base/Ruby';
import KanjiStrokeLoader from 'components/KanjiStrokeLoader';
import TagsList from 'components/TagsList';
import PitchDiagram from 'components/PitchDiagram';
import { Li } from './styles';

VocabEntryReading.propTypes = {
  character: PropTypes.string.isRequired,
  kana: PropTypes.arrayOf(PropTypes.string).isRequired,
  furi: PropTypes.string.isRequired,
  pitch: PropTypes.arrayOf(PropTypes.number).isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function VocabEntryReading({
  character,
  kana,
  furi,
  pitch,
  sentenceEn,
  sentenceJa,
  tags,
}) {
  return (
    <Li>
      <Ruby character={character} reading={kana[0]} furi={furi} />
      <TagsList tags={tags} />
      <SentencePair
        sentenceEn={sentenceEn}
        sentenceJa={sentenceJa}
        character={character}
        kana={kana}
      />
      <div style={{ display: 'flex' }}>
        {pitch.length < 1 ? (
          <PitchDiagram reading={kana[0]} />
        ) : (
          pitch.map((num) => <PitchDiagram key={cuid()} reading={kana[0]} pitchNum={num} />)
        )}
      </div>
      <KanjiStrokeLoader character={character} />
      <ReadingLinks character={character} />
    </Li>
  );
}

export default VocabEntryReading;
