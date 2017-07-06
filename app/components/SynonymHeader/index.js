import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Heading, Tags, RemoveButton } from './styles';

// actions will need
// handleRemoveSynonym => synonym id

SynonymHeader.propTypes = {
  // tags: PropTypes.array.isRequired,
  handleRemoveSynonym: PropTypes.func.isRequired,
};

function SynonymHeader({ handleRemoveSynonym }) {
  return (
    <Wrapper>
      <Heading>
        Synonym
      </Heading>
      <RemoveButton
        name="CLOSE"
        title="Remove Synonym"
        type="button"
        size="1.3em"
        onClick={handleRemoveSynonym}
      />
      {/* <Tags tags={tags} /> */}
    </Wrapper>
  );
}

export default SynonymHeader;
