import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import { createJishoUrl } from 'shared/urls';
import {
  StyledAnchor,
} from './styles';

function JishoSearchLink({ keyword, visuallyHidden }) {
  return (
    <StyledAnchor
      visuallyHidden={visuallyHidden}
      href={createJishoUrl(keyword)}
      title="Search Jisho"
      tabIndex={visuallyHidden ? '-1' : '0'}
      external
      plainLink
    >
      <Icon name="WORD_SEARCH" viewBox="0 0 100 100" size="1.8em" />
    </StyledAnchor>
  );
}

JishoSearchLink.propTypes = {
  keyword: PropTypes.string.isRequired,
  visuallyHidden: PropTypes.bool.isRequired,
};

export default JishoSearchLink;
