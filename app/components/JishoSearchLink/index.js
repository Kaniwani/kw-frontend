import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import A from 'components/A';

const StyledAnchor = styled(A)`
  display: block;
  padding: .2em .4em;
  transform: scale(.95);
  transition: transform .15s ease-in;
  &:hover {
    transform: scale(1);
    transition: transform .3s ease-out;
  }
`;

function JishoSearchLink({ keyword }) {
  const JISHO_URL = `http://jisho.org/search/${keyword}`;

  return (
    <StyledAnchor href={JISHO_URL} external plainLink title="Search Jisho" tabindex="-1">
      <Icon name="WORD_SEARCH" viewBox="0 0 100 100" size="1.8em" />
    </StyledAnchor>
  );
}

JishoSearchLink.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default JishoSearchLink;
