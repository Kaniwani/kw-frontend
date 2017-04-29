import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { createJishoUrl } from 'shared/urls';
import { StyledAnchor } from './styles';

JishoSearchLink.propTypes = {
  keyword: PropTypes.string.isRequired,
  visuallyHidden: PropTypes.bool,
};

JishoSearchLink.defaultProps = {
  visuallyHidden: false,
};

function JishoSearchLink({ keyword, visuallyHidden, ...props }) {
  return (
    <StyledAnchor
      href={createJishoUrl(keyword)}
      title="Search Jisho"
      tabIndex="-1"
      visuallyHidden={visuallyHidden}
      external
      plainLink
      {...props}
    >
      <Icon name="WORD_SEARCH" size="1.8rem" />
    </StyledAnchor>
  );
}

export default JishoSearchLink;
