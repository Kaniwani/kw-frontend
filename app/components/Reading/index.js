import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Character, Kana } from './styles';

Reading.propTypes = {
  character: PropTypes.string,
  kana: PropTypes.arrayOf(PropTypes.string),
};

Reading.defaultProps = {
  character: '',
  kana: [],
};

function Reading({ character, kana }) {
  return (
    <Wrapper>
      <Kana>{kana.join('・')}</Kana>
      <Character>{character}</Character>
    </Wrapper>
  );
}

export default Reading;
