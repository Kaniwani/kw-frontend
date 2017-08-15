import React from 'react';
import PropTypes from 'prop-types';
import { withStateHandlers } from 'recompose';

import SentencePair from 'components/SentencePair';
import ReadingLinks from 'components/ReadingLinks';
import Reading from 'components/Reading';
import IconButton from 'components/IconButton';
import KanjiStroke from 'components/KanjiStroke';
import TagsList from 'components/TagsList';

import { Li, ReadingContent, StrokeLoader, StrokeLoaderText } from './styles';

// avoids xhr if not called
const renderKanjiStroke = (character) => <KanjiStroke character={character} />;

QuizInfoReading.propTypes = {
  character: PropTypes.string.isRequired,
  kana: PropTypes.arrayOf(PropTypes.string).isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  detailLevel: PropTypes.number.isRequired,
  showKanjiSvg: PropTypes.bool.isRequired,
  toggleKanjiSvg: PropTypes.func.isRequired,
};

function QuizInfoReading({
  character,
  kana,
  sentenceEn,
  sentenceJa,
  tags,
  detailLevel,
  toggleKanjiSvg,
  showKanjiSvg,
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
      {detailLevel > 1 && <ReadingLinks character={character} />}
      {detailLevel > 1 && (
        <StrokeLoader>
          {!showKanjiSvg && (
            <IconButton
              plainButton
              name="BRUSH"
              title="View stroke diagram"
              size="1.8em"
              onClick={toggleKanjiSvg}
            >
              <StrokeLoaderText>Strokes</StrokeLoaderText>
            </IconButton>
          )}
          {showKanjiSvg && renderKanjiStroke(character)}
        </StrokeLoader>
      )}
    </Li>
  );
}

const enhance = withStateHandlers(
  () => ({ showKanjiSvg: false }),
  { toggleKanjiSvg: () => () => ({ showKanjiSvg: true }) },
);

export default enhance(QuizInfoReading);
