import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { pure } from 'recompose';

import { combineFuri } from './utils';

import {
  Wrapper,
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
    <Wrapper>
      {pairs.map(([kana, chars]) => (
        <Block key={uuid()} lang="ja">
          <Furi>{kana}</Furi>
          <Chars>{chars}</Chars>
        </Block>
      ))}
    </Wrapper>
  );
}

export default pure(Ruby);
