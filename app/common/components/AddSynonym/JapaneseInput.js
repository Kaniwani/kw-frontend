import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './styles';

JapaneseInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
};

function JapaneseInput({ label, input, ...rest }) {
  return (
    <Input
      lang="ja"
      placeholder={label}
      autoCapitalize="none"
      autoCorrect="none"
      autoComplete="off"
      spellCheck="false"
      {...input}
      {...rest}
    />
  );
}

export default JapaneseInput;
