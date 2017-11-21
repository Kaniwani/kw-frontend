import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import parseTags from 'utils/parseTags';

import { Ul, Li, Span } from './styles';

const selectTagColors = (text) => {
  const isCommon = /common/i.test(text);
  const isNoun = /noun/i.test(text);
  const isAdverb = /adverb/i.test(text);
  const isVerb = /\bverb/i.test(text);
  const isAdj = /\badj/i.test(text);

  // TODO: all pale background colors, black text?
  const colors = {
    default: { textColor: 'whiteLight', bgColor: 'grey' },
    common: { textColor: 'whiteLight', bgColor: 'blue' },
    noun: { textColor: 'whiteLight', bgColor: 'purpleLight' },
    adverb: { textColor: 'whiteLight', bgColor: 'pink' },
    verb: { textColor: 'blackLight', bgColor: 'teal' },
    adj: { textColor: 'blackLight', bgColor: 'yellow' },
  };

  switch (true) {
    case isCommon:
      return colors.common;
    case isNoun:
      return colors.noun;
    case isAdverb:
      return colors.adverb;
    case isVerb:
      return colors.verb;
    case isAdj:
      return colors.adj;
    default:
      return colors.default;
  }
};

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  isHidden: PropTypes.bool,
};

TagsList.defaultProps = {
  tags: [],
  isHidden: false,
};

function TagsList({ tags, isHidden, ...props }) {
  const longformTags = parseTags(tags);
  return (
    <Ul isHidden={isHidden} {...props}>
      {longformTags.map((text) => (
        <Li key={cuid()} {...selectTagColors(text)}>
          <Span>{text}</Span>
        </Li>
      ))}
    </Ul>
  );
}

export default TagsList;
