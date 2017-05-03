import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import { HeadingWrapper, StyledHeading, Tags, RemoveButton } from './styles';

// selectors will need
// const selectTags = combineTags(tags, jlpt, common); (same as ReadingHeading)

// actions will need
// handleRemoveSynonym => synonym id

SynonymHeading.propTypes = {
  tags: PropTypes.array.isRequired,
  handleRemoveSynonym: PropTypes.func.isRequired,
};

function SynonymHeading({ handleRemoveSynonym, tags }) {
  return (
    <HeadingWrapper>
      <StyledHeading>
        Synonym
        <RemoveButton
          title="Remove Synonym"
          type="button"
          onClick={handleRemoveSynonym}
        >
          <Icon name="CLOSE" inline={false} />
        </RemoveButton>
      </StyledHeading>
      <Tags tags={tags} />
    </HeadingWrapper>
  );
}

export default SynonymHeading;
