import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Icon from 'components/Icon';
import { HeadingWrapper, Heading, Tags, RemoveButton } from './UI';

const InfoHeading = ({ category, tags }) => (
  <HeadingWrapper>
    <Heading>{category}
      {category === 'Synonym' && (
        <RemoveButton title="Remove Synonym" type="button" onClick={() => console.info('TODO: Implement remove synonym')}>
          <Icon name="CLOSE" />
        </RemoveButton>
      )}
    </Heading>
    <Tags items={tags} />
  </HeadingWrapper>
);

InfoHeading.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

export default InfoHeading;
