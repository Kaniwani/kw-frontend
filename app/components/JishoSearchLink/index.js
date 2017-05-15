import React from 'react';
import PropTypes from 'prop-types';

import { createJishoUrl } from 'shared/urls';
import IconLink from 'components/IconLink';

JishoSearchLink.propTypes = {
  keyword: PropTypes.string.isRequired,
};

function JishoSearchLink({ keyword, ...props }) {
  return (
    <IconLink
      href={createJishoUrl(keyword)}
      name="WORD_SEARCH"
      title={`Search Jisho for ${keyword}`}
      size="1.8rem"
      tabIndex="-1"
      external
      plainLink
      {...props}
    />
  );
}

export default JishoSearchLink;
