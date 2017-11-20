import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { pure } from 'recompose';

import Container from 'base/Container';
import { combineFuri } from './utils';

import {
  Block,
  Furi,
  Chars,
} from './styles';

Ruby.propTypes = {
  character: PropTypes.string.isRequired,
  reading: PropTypes.string.isRequired,
  furi: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

Ruby.defaultProps = {
  furi: '',
};

function Ruby({ character, reading, furi }) {
  // TODO: use as selector/fn for mapStateToProps (or recompose mapProps)
  const pairs = combineFuri(character, reading, furi);
  return (
    <Container flexRow>
      {pairs.map(([kana, chars]) => (
        <Block key={uuid()} lang="ja">
          <Furi>{kana}</Furi>
          <Chars>{chars}</Chars>
        </Block>
      ))}
    </Container>
  );
}

export default pure(Ruby);
