import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import splitKeepingDelimiter from 'utils/splitKeepingDelimiter';

import { Wrapper, Character, Kanas, Kana } from './styles';

PrimaryReading.propTypes = {
  character: PropTypes.string.isRequired,
  kana: PropTypes.array.isRequired,
};

const renderKana = (kana) => kana.map((k) => <Kana key={uuid()}>{k}</Kana>);

function PrimaryReading({ character, kana }) {
  const SEPARATOR = '・';
  const kanaWithSeparator = splitKeepingDelimiter(kana.join(SEPARATOR), SEPARATOR);

  return (
    <Wrapper>
      <Character>{character}</Character>
      <Kanas>{renderKana(kanaWithSeparator)}</Kanas>
    </Wrapper>
  );
}

export default PrimaryReading;
