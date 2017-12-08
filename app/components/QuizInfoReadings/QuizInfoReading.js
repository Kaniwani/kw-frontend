import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import Element from 'base/Element';
import Ruby from 'base/Ruby';
import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import KanjiStrokeLoader from 'components/KanjiStrokeLoader';
import TagsList from 'components/TagsList';
import PitchDiagram from 'components/PitchDiagram';
import { Kana } from 'components/Reading/styles';

import { Li, ReadingContent } from './styles';

QuizInfoReading.propTypes = {
  character: PropTypes.string.isRequired,
  kana: PropTypes.arrayOf(PropTypes.string).isRequired,
  furi: PropTypes.string.isRequired,
  pitch: PropTypes.arrayOf(PropTypes.number).isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  detailLevel: PropTypes.number.isRequired,
};

function QuizInfoReading({
  character,
  kana,
  furi,
  pitch,
  sentenceEn,
  sentenceJa,
  tags,
  detailLevel,
}) {
  return (
    <Li>
      <ReadingContent>
        <Ruby
          character={character}
          reading={kana[0]}
          furi={furi}
          showFuri={detailLevel >= 1}
        />
        {detailLevel >= 1 &&
          kana.length > 1 && (
            <Element>
              <Kana>{kana.slice(1).join('・')}</Kana>
            </Element>
          )}
        {detailLevel > 1 && <TagsList tags={tags} />}
        {detailLevel > 1 && (
          <SentencePair
            sentenceEn={sentenceEn}
            sentenceJa={sentenceJa}
            character={character}
            kana={kana}
          />
        )}
      </ReadingContent>
      {detailLevel > 1 &&
        pitch.map((num) => <PitchDiagram key={cuid()} reading={kana[0]} pitchNum={num} />)}
      {detailLevel > 1 && <KanjiStrokeLoader character={character} data-ignore-hotkeys />}
      {detailLevel > 1 && <ReadingLinks character={character} />}
    </Li>
  );
}

export default QuizInfoReading;
