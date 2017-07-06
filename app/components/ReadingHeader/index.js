import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Heading, VocabLink, Tags } from './styles';

ReadingHeader.propTypes = {
  id: PropTypes.number.isRequired,
  character: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  withKwLink: PropTypes.bool,
};

ReadingHeader.defaultProps = {
  withKwLink: true,
};

function ReadingHeader({ id, character, tags, withKwLink }) {
  return (
    <Wrapper>
      <Heading>
        Reading
      </Heading>
      <VocabLink
        href={`//wanikani.com/vocabulary/${character}`}
        title="View on WaniKani"
        external
      >
        WK
      </VocabLink>
      {withKwLink && (
        <VocabLink
          to={`/vocabulary/entry/${id}`}
          title="View on KaniWani"
          target="_blank"
        >
          KW
        </VocabLink>
      )}
      <Tags tags={tags} />
    </Wrapper>
  );
}

export default ReadingHeader;
