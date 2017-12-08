import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, branch, renderNothing } from 'recompose';
import { createSelector } from 'reselect';

import { makeSelectReviewReadings, selectVocabularySettings } from 'shared/selectors';

import QuizInfoReading from './QuizInfoReading';

import { Ul } from './styles';

QuizInfoReadings.propTypes = {
  readings: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  detailLevel: PropTypes.number,
  useEijiroPro: PropTypes.bool.isRequired,
};

QuizInfoReadings.defaultProps = {
  detailLevel: 2,
};

function QuizInfoReadings({ readings, ...props }) {
  return (
    <Ul>
      {readings.map((reading, index) => <QuizInfoReading key={cuid()} index={index} {...reading} {...props} />)}
    </Ul>
  );
}

const mapStateToProps = (state, { id }) => ({
  readings: makeSelectReviewReadings(id)(state),
  useEijiroPro: createSelector(selectVocabularySettings, ({ useEijiroPro }) => useEijiroPro)(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ readings }) => !readings.length, renderNothing),
);

export default enhance(QuizInfoReadings);
