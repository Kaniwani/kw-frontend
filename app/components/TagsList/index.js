import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { PARTS_OF_SPEECH } from 'shared/constants';
import Ul from 'base/Ul';
import Chip from 'components/Chip';

const selectColors = (text) => {
  if (/common/i.test(text)) {
    return {
      color: 'whiteLight',
      bgColor: 'blue',
    };
  }
  if (/jlpt/i.test(text)) {
    return {
      bgColor: 'tan',
    };
  }
  return {};
};

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.oneOf(PARTS_OF_SPEECH)),
};

TagsList.defaultProps = {
  tags: [],
};

function TagsList({ tags }) {
  return (
    <Ul plainList>
      {tags.map((text) => <Chip key={cuid()} {...selectColors(text)}>{text}</Chip>)}
    </Ul>
  );
}

export default TagsList;
