import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, branch, renderNothing } from 'recompose';

import { makeSelectReviewReadings } from 'containers/App/selectors';

import VocabEntryReading from './VocabEntryReading';

import { Ul } from './styles';

VocabEntryReadings.propTypes = {
  readings: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  showLock: PropTypes.bool,
  detailLevel: PropTypes.number,
};

VocabEntryReadings.defaultProps = {
  showLock: false,
  detailLevel: 2,
};

function VocabEntryReadings({ readings, ...props }) {
  return (
    <Ul>
      {readings.map((reading, index) =>
        <VocabEntryReading key={cuid()} index={index} {...reading} {...props} />
      )}
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
