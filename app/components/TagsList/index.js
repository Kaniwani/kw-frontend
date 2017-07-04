import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { PARTS_OF_SPEECH } from 'shared/constants';
import { Ul, Li, Span } from './styles';

const selectTagColors = (text) => {
  const isCommon = /^common/i.test(text);
  const isUncommon = /^uncommon/i.test(text);
  const isJlpt = /^jlpt/i.test(text);

  const defaultColors = { color: 'whiteLight', bgColor: 'grey' };
  const uncommonColors = { ...defaultColors, bgColor: 'orange' };
  const commonColors = { ...defaultColors, bgColor: 'blue' };
  const jlptColors = { color: 'blackLight', bgColor: 'tan' };

  switch (true) {
    case isCommon: return commonColors;
    case isUncommon: return uncommonColors;
    case isJlpt: return jlptColors;
    default: return defaultColors;
  }
};

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.oneOf(PARTS_OF_SPEECH)),
};

TagsList.defaultProps = {
  tags: [],
};

function TagsList({ tags, ...props }) {
  return (
    <Ul {...props}>
      {tags.map((text) => (
        <Li key={cuid()} {...selectTagColors(text)} >
          <Span>{text}</Span>
        </Li>
      ))}
    </Ul>
  );
}

export default TagsList;
