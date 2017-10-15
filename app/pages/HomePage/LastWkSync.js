import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderNothing } from 'recompose';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { selectLastWkSyncDate } from 'shared/selectors';
import Element from 'base/Element';
import H4 from 'base/H4';

LastWkSync.propTypes = {
  lastWkSyncDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
};

function LastWkSync({ lastWkSyncDate }) {
  return (
    <Element flexRow flexCenter>
      <H4>
        Last Sync with WaniKani: {distanceInWordsToNow(lastWkSyncDate, { includeSeconds: true, suffix: true })} ago
      </H4>
    </Element>
  );
}

const enhance = compose(
  connect((state) => ({ lastWkSyncDate: selectLastWkSyncDate(state) })),
  branch(({ lastWkSyncDate }) => lastWkSyncDate === undefined, renderNothing),
  pure,
);

export default enhance(LastWkSync);
