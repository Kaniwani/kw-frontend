import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, branch, renderNothing } from 'recompose';

import { makeSelectReviewReadings } from 'containers/App/selectors';

import ReadingHeader from 'components/ReadingHeader';
import SentencePair from 'components/SentencePair';
import VocabEntryLinks from 'components/VocabEntryLinks';
import Reading from 'components/Reading';
// import PitchInfo from 'components/PitchInfo';
import KanjiStroke from 'components/KanjiStroke';
import { Ul, Li, ReadingContent } from './styles';

VocabEntryReadings.propTypes = {
  readings: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  showLock: PropTypes.bool,
};

VocabEntryReadings.defaultProps = {
  showLock: false,
};

function VocabEntryReadings({ id, readings, showLock }) {
  return (
    <Ul>
      {readings.map(({ character, kana, sentenceEn, sentenceJa, tags }, index) => (
        <Li key={cuid()}>
          <ReadingHeader showLock={showLock && index === 0} id={id} character={character} tags={tags} />
          <VocabEntryLinks character={character} />
          <ReadingContent>
            <Reading character={character} kana={kana} />
            <SentencePair
              sentenceEn={sentenceEn}
              sentenceJa={sentenceJa}
              character={character}
              kana={kana}
            />
          </ReadingContent>
          {/* <PitchInfo character={character} /> */}
          <KanjiStroke character={character} />
        </Li>
      ))}
    </Ul>
  );
}

const mapStateToProps = (state, { id }) => ({
  readings: makeSelectReviewReadings(id)(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ readings }) => !readings.length, renderNothing),
);


export default enhance(VocabEntryReadings);
