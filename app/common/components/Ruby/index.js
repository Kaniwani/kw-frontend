import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { combineFuri } from './utils';

import { Wrapper, Block, Furi, Chars } from './styles';

Ruby.propTypes = {
  word: PropTypes.string.isRequired,
  reading: PropTypes.string,
  furi: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  showFuri: PropTypes.bool,
  withDataAttr: PropTypes.bool,
};

Ruby.defaultProps = {
  reading: '',
  furi: '',
  showFuri: true,
  withDataAttr: false,
};

function Ruby({ word, reading, furi, showFuri, withDataAttr }) {
  const pairs = combineFuri(word, reading, furi);
  const wrapperProps = withDataAttr ? { 'data-ruby': `${word} ${reading}` } : {};
  return (
    <Wrapper {...wrapperProps}>
      {pairs.map(([kana, chars]) => (
        <Block key={cuid()} lang="ja">
          {showFuri && <Furi>{kana}</Furi>}
          <Chars>{chars}</Chars>
        </Block>
      ))}
    </Wrapper>
  );
}

export default Ruby;
