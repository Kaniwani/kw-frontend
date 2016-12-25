import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Link = styled.a`
  display: block;
  padding: .2em .4em;
  transform: scale(.9);
  transition: transform .15s ease-in;
  &:hover {
    transform: scale(1);
    transition: transform .3s ease-out;
  }
`;


function JishoSearchLink({ keyword }) {
  const JISHO_URL = `http://jisho.org/search/${keyword}`;

  return (
    <Link
      href={JISHO_URL}
      rel="external noopener noreferrer"
      target="_blank"
      title="Search Jisho"
      tabindex="-1"
    >
      <Icon name="WORD_SEARCH" viewBox="0 0 100 100" size="2em" />
    </Link>
  );
}

JishoSearchLink.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default JishoSearchLink;
