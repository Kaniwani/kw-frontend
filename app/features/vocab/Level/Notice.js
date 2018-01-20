import React from 'react';
import PropTypes from 'prop-types';

import Element from 'common/components/Element';
import H3 from 'common/components/H3';
import A from 'common/components/A';

Notice.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number),
  isLocked: PropTypes.bool,
};

function Notice({ ids, isLocked }) {
  let notice = null;
  if (isLocked === true) {
    notice = (
      <Element>
        <H3>
          Level is locked! Unlock it in <A to="/vocabulary">Vocabulary Levels</A>
        </H3>
      </Element>
    );
  } else if (isLocked === false && !ids.length) {
    notice = (
      <Element>
        <H3>
          All entries hidden. Check your WaniKani SRS filtering in <A to="/settings">Settings</A>
        </H3>
      </Element>
    );
  }
  return notice;
}

export default Notice;
