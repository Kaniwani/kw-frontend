import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Heading, VocabLink, Tags } from './styles';

// selectors will need
// selectTags = combineTags(tags, jlpt, common); (same as SynonymHeading)

ReadingHeader.propTypes = {
  id: PropTypes.number.isRequired,
  primaryCharacter: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

function ReadingHeader({ id, primaryCharacter, tags }) {
  return (
    <Wrapper>
      <Heading>
        Reading
      </Heading>
      <VocabLink
        href={`//wanikani.com/vocabulary/${primaryCharacter}`}
        title="View on WaniKani"
        external
      >
        WK
      </VocabLink>
      <VocabLink
        to={`/vocabulary/entry/${id}`}
        title="View on KaniWani"
        target="_blank"
      >
        KW
      </VocabLink>
      <Tags tags={tags} />
    </Wrapper>
  );
}

export default ReadingHeader;
