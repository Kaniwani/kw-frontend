import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { compose, flattenProp, onlyUpdateForKeys, setPropTypes } from 'recompose';

import splitKeepingDelimiter from 'utils/splitKeepingDelimiter';

import { Wrapper, Character, Kanas, Kana } from './styles';

const enhance = compose(
  setPropTypes({ entry: PropTypes.object.isRequired }),
  flattenProp('entry'),
  onlyUpdateForKeys(['character', 'kana']),
);

const SEPARATOR = '・';

const PrimaryReading = enhance(({ character, kana }) => {
  const kanasWithSeparator = splitKeepingDelimiter(kana.join(SEPARATOR), SEPARATOR);

  return (
    <Wrapper>
      <Character>{character}</Character>
      <Kanas>{kanasWithSeparator.map(k => <Kana key={uuid()}>{k}</Kana>)}</Kanas>
    </Wrapper>
  );
});

export default PrimaryReading;
