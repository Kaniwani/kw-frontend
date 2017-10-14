import React from 'react';
import PropTypes from 'prop-types';

import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import Reading from 'components/Reading';
import KanjiStrokeLoader from 'components/KanjiStrokeLoader';
import TagsList from 'components/TagsList';
import PitchDiagram from 'components/PitchDiagram';

import { Li, ReadingContent } from './styles';

QuizInfoReading.propTypes = {
  character: PropTypes.string.isRequired,
  kana: PropTypes.arrayOf(PropTypes.string).isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  detailLevel: PropTypes.number.isRequired,
};

function QuizInfoReading({
  character,
  kana,
  sentenceEn,
  sentenceJa,
  tags,
  detailLevel,
}) {
  return (
    <Li>
      <ReadingContent>
        <Reading character={character} kana={kana} detailLevel={detailLevel} />
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

      {detailLevel > 1 && <PitchDiagram reading={kana[0]} pitchNum={3} />}
      {detailLevel > 1 && <KanjiStrokeLoader character={character} />}
      {detailLevel > 1 && <ReadingLinks character={character} />}
    </Li>
  );
}

export default QuizInfoReading;
