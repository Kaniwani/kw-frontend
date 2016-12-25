import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Icon from 'components/Icon';
import { Heading, H4, Tags, RemoveButton } from './UI';

const InfoHeading = ({ category, tags }) => (
  <Heading>
    <H4>{category}
      {category === 'Synonym' && (
        <RemoveButton title="Remove Synonym" type="button" onClick={() => console.info('TODO: Implement remove synonym')}>
          <Icon name="CLOSE" />
        </RemoveButton>
      )}
    </H4>
    <Tags items={tags} />
  </Heading>
);

InfoHeading.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

export default InfoHeading;
