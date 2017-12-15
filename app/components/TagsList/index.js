import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import parseTags from "utils/parseTags";
import selectTagColors from "./utils/selectTagColors";

import { Ul, Li, Span } from "./styles";

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
