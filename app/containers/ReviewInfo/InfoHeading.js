import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Icon from 'components/Icon';
import { HeadingWrapper, Heading, Tags, RemoveButton } from './styles';

const InfoHeading = ({ category, tags, handleClick }) => (
  <HeadingWrapper>
    <Heading>{category}
      {category === 'Synonym' && (
      <RemoveButton title="Remove Synonym" type="button" onClick={handleClick}>
        <Icon name="CLOSE" inline={false} />
      </RemoveButton>
        )}
    </Heading>
    <Tags items={tags} />
  </HeadingWrapper>
  );

InfoHeading.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.Iterable),
  handleClick: PropTypes.func,
};

export default InfoHeading;
