import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import { Wrapper, Heading, Tags, RemoveButton } from './styles';

// selectors will need
// const selectTags = combineTags(tags, jlpt, common); (same as ReadingHeading)

// actions will need
// handleRemoveSynonym => synonym id

SynonymHeader.propTypes = {
  tags: PropTypes.array.isRequired,
  handleRemoveSynonym: PropTypes.func.isRequired,
};

function SynonymHeader({ handleRemoveSynonym, tags }) {
  return (
    <Wrapper>
      <Heading>
        Synonym
        <RemoveButton
          title="Remove Synonym"
          type="button"
          onClick={handleRemoveSynonym}
        >
          <Icon name="CLOSE" inline={false} />
        </RemoveButton>
      </Heading>
      <Tags tags={tags} />
    </Wrapper>
  );
}

export default SynonymHeader;
