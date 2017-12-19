import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import parseTags from "utils/parseTags";
import getTagColors from "./utils/getTagColors";

import { Ul, Li, Span } from "./styles";

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  isVisible: PropTypes.bool,
};

TagsList.defaultProps = {
  tags: [],
  isVisible: true,
};

function TagsList({ tags, isVisible, ...props }) {
  const longformTags = parseTags(tags);
  return (
    <Ul isHidden={!isVisible} {...props}>
      {longformTags.map((text) => (
        <Li key={cuid()} {...getTagColors(text)}>
          <Span>{text}</Span>
        </Li>
      ))}
    </Ul>
  );
}

export default TagsList;
