import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderNothing } from 'recompose';
import { distanceInWordsToNow } from 'date-fns';

import Element from 'base/Element';
import Button from 'base/Button';
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
    <Element>
      <H5>
        {'Last sync with WaniKani: '}
        {distanceInWordsToNow(lastWkSyncDate, {
          includeSeconds: true,
          suffix: true,
        })}
        {' ago'}
      </H5>
      <Element>
        <Button disabled>Sync Now</Button>
      </Element>
    </Element>
  );
}

export default compose(
  branch(({ lastWkSyncDate }) => lastWkSyncDate === undefined, renderNothing),
  pure
)(LastWkSync);
