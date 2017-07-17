import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { makeSelectReviewReadings } from 'containers/App/selectors';

import Element from 'base/Element';
import ReadingHeader from 'components/ReadingHeader';
import SentencePair from 'components/SentencePair';
import TagsList from 'components/TagsList';
// import PitchInfo from 'components/PitchInfo';
// import KanjiStroke from 'components/KanjiStroke';
import Reading from './Reading';

VocabEntryReadings.propTypes = {
  readings: PropTypes.array.isRequired,
};

function VocabEntryReadings({ readings }) {
  return (
    <div>
      {readings.map((reading) => (
        <div key={uuid()} >
          <ReadingHeader character={reading.character} tags={reading.tags} />
          <Element>
            <TagsList tags={reading.tags} />
          </Element>
          <Reading character={reading.character} kana={reading.kana} />
          <SentencePair reading={reading} />
          {/* <PitchInfo character={reading.character} /> */}
          {/* <KanjiStroke character={reading.character} /> */}
        </div>
    ))}
    </div>
  );
}

const mapStateToProps = (state, { id }) => ({
  readings: makeSelectReviewReadings(id)(state),
});

export default connect(mapStateToProps)(VocabEntryReadings);
