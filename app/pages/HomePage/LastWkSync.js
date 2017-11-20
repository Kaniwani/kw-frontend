import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderNothing } from 'recompose';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Element from 'base/Element';
import H5 from 'base/H5';

LastWkSync.propTypes = {
  lastWkSyncDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([false]),
  ]).isRequired,
};

function LastWkSync({ lastWkSyncDate }) {
  return (
    <Element flexRow flexCenter>
      <H5 style={{ color: 'grey' }}>
        Last Sync with WaniKani:{' '}
        {distanceInWordsToNow(lastWkSyncDate, {
          includeSeconds: true,
          suffix: true,
        })}{' '}
        ago
      </H5>
    </Element>
  );
}

export default compose(
  branch(({ lastWkSyncDate }) => lastWkSyncDate === undefined, renderNothing),
  pure
)(LastWkSync);
