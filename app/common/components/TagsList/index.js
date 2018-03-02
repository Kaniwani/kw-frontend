import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';

import { selectTags } from 'features/vocab/selectors';

import parseTags from 'common/utils/parseTags';
import getTagColors from './utils/getTagColors';

import { Ul, Li, Text } from './styles';

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  isVisible: PropTypes.bool,
};

TagsList.defaultProps = {
  tags: [],
  isVisible: true,
};

export function TagsList({ tags, isVisible, ...props }) {
  const longformTags = parseTags(tags);
  return (
    <Ul isHidden={!isVisible} {...props}>
      {longformTags.map((text) => (
        <Li key={cuid()} {...getTagColors(text)}>
          <Text>{text}</Text>
        </Li>
      ))}
    </Ul>
  );
}

const mapStateToProps = (state, props) => ({
  tags: selectTags(state, props),
});

export default connect(mapStateToProps)(TagsList);
