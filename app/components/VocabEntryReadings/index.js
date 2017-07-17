import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, branch, renderNothing } from 'recompose';

import { makeSelectReviewReadings } from 'containers/App/selectors';

import ReadingHeader from 'components/ReadingHeader';
import SentencePair from 'components/SentencePair';
import VocabEntryLinks from 'components/VocabEntryLinks';
// import PitchInfo from 'components/PitchInfo';
// import KanjiStroke from 'components/KanjiStroke';
import { Outer, Inner, ReadingContent, Reading, Character, Kana } from './styles';

VocabEntryReadings.propTypes = {
  readings: PropTypes.array.isRequired,
};

function VocabEntryReadings({ readings }) {
  return (
    <Outer>
      {readings.map((reading) => (
        <Inner key={cuid()}>
          <ReadingHeader character={reading.character} tags={reading.tags} />
          <VocabEntryLinks character={reading.character} />
          <ReadingContent>
            <Reading>
              <Kana>{reading.kana.join('・')}</Kana>
              <Character>{reading.character}</Character>
            </Reading>
            <SentencePair reading={reading} />
          </ReadingContent>
          {/* <PitchInfo character={reading.character} /> */}
          {/* <KanjiStroke character={reading.character} /> */}
        </Inner>
      ))}
    </Outer>
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
