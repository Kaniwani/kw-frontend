import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { pure } from 'recompose';

import Container from 'base/Container';
import { combineFuri } from './utils';

import { Block, Furi, Chars } from './styles';

Ruby.propTypes = {
  character: PropTypes.string.isRequired,
  reading: PropTypes.string.isRequired,
  furi: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  showFuri: PropTypes.bool,
};

Ruby.defaultProps = {
  furi: '',
  showFuri: true,
};

function Ruby({
  character, reading, furi, showFuri,
}) {
  const pairs = combineFuri(character, reading, furi);
  return (
    <Container flexRow>
      {/* TODO: fragment in map, replace Container with Block */}
      {pairs.map(([kana, chars]) => (
        <Block key={uuid()} lang="ja">
          <Furi isVisible={showFuri}>{kana}</Furi>
          <Chars>{chars}</Chars>
        </Block>
      ))}
    </Container>
  );
}

export default pure(Ruby);
