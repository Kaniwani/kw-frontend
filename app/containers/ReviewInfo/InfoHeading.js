import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import { Heading, H4, Tags } from './UI';

const InfoHeading = ({ text, tags }) => (
  <Heading>
    <H4>{text}</H4>
    <Tags items={tags} />
  </Heading>
);

InfoHeading.propTypes = {
  text: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

export default InfoHeading;
