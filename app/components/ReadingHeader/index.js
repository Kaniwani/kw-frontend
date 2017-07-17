import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import TagsList from 'components/TagsList';

import { Wrapper, Heading } from './styles';

ReadingHeader.propTypes = {
  character: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

function ReadingHeader({ character, tags }) {
  return (
    <Wrapper>
      <Heading>
        Reading
      </Heading>
      <TagsList tags={tags} />
    </Wrapper>
  );
}

export default ReadingHeader;
