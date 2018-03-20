import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import { selectLastWkSyncDate } from 'features/user/selectors';

import Element from 'common/components/Element';
import H5 from 'common/components/H5';
import P from 'common/components/P';

LastWkSync.propTypes = {
  lastWkSync: PropTypes.string.isRequired,
};

export function LastWkSync({ lastWkSync }) {
  return (
    <Element flexRow flexWrap alignItems="center">
      <H5>Last Sync with WaniKani:</H5>
      <P style={{ fontSize: '0.95rem' }}>{lastWkSync}</P>
    </Element>
  );
}

const mapStateToProps = (state) => ({
  lastWkSync: `${distanceInWordsToNow(selectLastWkSyncDate(state), {
    includeSeconds: true,
    suffix: true,
  })} ago`,
});

export default connect(mapStateToProps)(LastWkSync);
