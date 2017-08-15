import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { PARTS_OF_SPEECH } from 'shared/constants';
import { Ul, Li, Span } from './styles';

const selectTagColors = (text) => {
  const isCommon = /^common/i.test(text);
  const isUncommon = /^uncommon/i.test(text);
  const isJlpt = /^jlpt/i.test(text);
  const isNoun = /noun/i.test(text);
  const isVerb = /verb/i.test(text);
  const isAdj = /adj/i.test(text);

  const defaultColors = { textColor: 'whiteLight', bgColor: 'grey' };
  const commonColors = { textColor: 'whiteLight', bgColor: 'blue' };
  const uncommonColors = { textColor: 'whiteLight', bgColor: 'orange' };
  const jlptColors = { textColor: 'blackLight', bgColor: 'tan' };
  const verbColors = { textColor: 'whiteLight', bgColor: 'teal' };
  const adjColors = { textColor: 'blackLight', bgColor: 'yellow' };
  const nounColors = { textColor: 'whiteLight', bgColor: 'purpleLight' };

  switch (true) {
    case isCommon: return commonColors;
    case isUncommon: return uncommonColors;
    case isJlpt: return jlptColors;
    case isNoun: return nounColors;
    case isVerb: return verbColors;
    case isAdj: return adjColors;
    default: return defaultColors;
  }
};

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.oneOf(PARTS_OF_SPEECH)),
  isHidden: PropTypes.bool,
};

TagsList.defaultProps = {
  tags: [],
  isHidden: false,
};

function TagsList({ tags, isHidden, ...props }) {
  return (
    <Ul isHidden={isHidden} {...props}>
      {tags.map((text) => (
        <Li key={cuid()} {...selectTagColors(text)} >
          <Span>{text}</Span>
        </Li>
      ))}
    </Ul>
  );
}

export default TagsList;
