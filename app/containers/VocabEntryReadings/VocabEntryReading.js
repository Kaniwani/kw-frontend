import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import Ruby from 'components/Ruby';
import StrokeLoader from 'components/StrokeLoader';
import TagsList from 'components/TagsList';
import PitchDiagram from 'components/PitchDiagram';
import Element from 'base/Element';
import { Kana } from 'components/Reading/styles';
import { Li } from './styles';

VocabEntryReading.propTypes = {
  useEijiroPro: PropTypes.bool.isRequired,
  character: PropTypes.string.isRequired,
  kana: PropTypes.arrayOf(PropTypes.string).isRequired,
  furi: PropTypes.string.isRequired,
  pitch: PropTypes.arrayOf(PropTypes.number).isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function VocabEntryReading({
  useEijiroPro,
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
      {kana.length > 1 && (
        <Element>
          <Kana>{kana.slice(1).join('・')}</Kana>
        </Element>
      )}
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
      <StrokeLoader character={character} />
      <ReadingLinks character={character} useEijiroPro={useEijiroPro} />
    </Li>
  );
}

export default VocabEntryReading;
