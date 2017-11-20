import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderNothing } from 'recompose';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Element from 'base/Element';
import H4 from 'base/H4';

LastWkSync.propTypes = {
  lastWkSyncDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
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

export default compose(
  branch(({ lastWkSyncDate }) => lastWkSyncDate === undefined, renderNothing),
  pure,
)(LastWkSync);
