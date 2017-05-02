import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Heading, VocabLink, Tags } from './styles';

// selectors will need
// selectWkVocabLink = `//wanikani.com/vocabulary/${character}`;
// selectKwVocabLink = `/vocabulary/entry/${id}`;
// selectTags = combineTags(tags, jlpt, common); (same as SynonymHeading)

ReadingHeader.propTypes = {
  wkVocabLink: PropTypes.string.isRequired,
  kwVocabLink: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

function ReadingHeader({ wkVocabLink, kwVocabLink, tags }) {
  return (
    <Wrapper>
      <Heading>
        Reading
        <VocabLink href={wkVocabLink} title="View on WaniKani" external>
          WK
        </VocabLink>
        <VocabLink to={kwVocabLink} title="View on KaniWani" target="_blank">
          KW
        </VocabLink>
      </Heading>
      <Tags tags={tags} />
    </Wrapper>
  );
}

export default ReadingHeader;
