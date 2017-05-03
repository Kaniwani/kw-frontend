import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import * as COLORS from 'shared/styles/colors';
import { PARTS_OF_SPEECH } from 'shared/constants';
import { Ul, Li, Span } from './styles';

const selectColors = ({ text, color, bgColor }) => {
  if (/common/i.test(text)) {
    return {
      color: 'whiteLight',
      bgColor: 'blue',
    };
  }
  if (/jlpt/i.test(text)) {
    return {
      color: 'blackLight',
      bgColor: 'tan',
    };
  }
  return {
    color,
    bgColor,
  };
};

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.oneOf(PARTS_OF_SPEECH)),
  color: PropTypes.oneOf(Object.keys(COLORS)),
  bgColor: PropTypes.oneOf(Object.keys(COLORS)),
};

TagsList.defaultProps = {
  tags: [],
  color: 'whiteLight',
  bgColor: 'grey',
};

function TagsList({ tags, ...props }) {
  return (
    <Ul {...props}>
      {tags.map((text) => (
        <Li key={cuid()} {...selectColors({ text, ...props })} >
          <Span>{text}</Span>
        </Li>
      ))}
    </Ul>
  );
}

export default TagsList;
