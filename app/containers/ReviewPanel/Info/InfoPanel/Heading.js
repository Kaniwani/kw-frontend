import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Icon from 'components/Icon';

import { HeadingWrapper, StyledHeading, VocabLink, Tags, RemoveButton } from './styles';

Heading.propTypes = {
  category: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.List).isRequired,
  handleClick: PropTypes.func.isRequired,
};

function Heading({ category, character, id, tags, handleClick }) {
  return (
    <HeadingWrapper>
      {category === 'Reading' && (
        <StyledHeading>
          {category}
          <VocabLink href={`//wanikani.com/vocabulary/${character}`} title="View on WaniKani" external>
            WK
          </VocabLink>
          <VocabLink to={`/vocabulary/entry/${id}`} title="View on KaniWani" target="_blank">
            KW
          </VocabLink>
        </StyledHeading>
      )}
      {category === 'Synonym' && (
        <StyledHeading>{category}
          <RemoveButton title="Remove Synonym" type="button" onClick={handleClick}>
            <Icon name="CLOSE" inline={false} />
          </RemoveButton>
        </StyledHeading>
      )}
      <Tags items={tags} />
    </HeadingWrapper>
  );
}

export default Heading;
