import React from 'react';
import PropTypes from 'prop-types';

import { createJishoUrl } from 'common/api';
import IconLink from 'common/components/IconLink';

JishoSearchLink.propTypes = {
  keyword: PropTypes.string.isRequired,
  visuallyHidden: PropTypes.bool,
};

JishoSearchLink.defaultProps = {
  visuallyHidden: false,
};

function JishoSearchLink({ keyword, visuallyHidden, ...props }) {
  return (
    <IconLink
      href={createJishoUrl(keyword)}
      name="WORD_SEARCH"
      title={`Search Jisho for ${keyword}`}
      size="1.8rem"
      tabIndex={visuallyHidden ? -1 : 0}
      external
      plainLink
      visuallyHidden={visuallyHidden}
      {...props}
    />
  );
}

export default JishoSearchLink;
