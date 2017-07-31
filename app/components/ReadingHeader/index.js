import React from 'react';
import PropTypes from 'prop-types';

import TagsList from 'components/TagsList';
import VocabEntryLock from 'components/VocabEntryLock';

import { Wrapper/* , Heading */ } from './styles';

ReadingHeader.propTypes = {
  tags: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  showLock: PropTypes.bool.isRequired,
};

function ReadingHeader({ id, showLock, tags }) {
  return (
    <Wrapper>
      {/* <Heading>Reading</Heading> */}
      <TagsList tags={tags} />
      {showLock && <VocabEntryLock id={id} />}
    </Wrapper>
  );
}

export default ReadingHeader;
