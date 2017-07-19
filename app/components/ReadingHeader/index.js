import React from 'react';
import PropTypes from 'prop-types';

import TagsList from 'components/TagsList';

import { Wrapper, Heading } from './styles';

ReadingHeader.propTypes = {
  tags: PropTypes.array.isRequired,
};

function ReadingHeader({ tags }) {
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
