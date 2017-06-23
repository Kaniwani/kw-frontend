import React from 'react';
import PropTypes from 'prop-types';

import TagsList from 'components/TagsList';
import { HeadingWrapper, StyledHeading, VocabLink } from './styles';

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
    <HeadingWrapper>
      <StyledHeading>
        Reading
        <VocabLink href={wkVocabLink} title="View on WaniKani" external>
          WK
        </VocabLink>
        <VocabLink to={kwVocabLink} title="View on KaniWani" target="_blank">
          KW
        </VocabLink>
      </StyledHeading>
      <TagsList tags={tags} />
    </HeadingWrapper>
  );
}

export default ReadingHeader;
