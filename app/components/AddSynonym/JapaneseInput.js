import React from 'react';
import PropTypes from 'prop-types';
import { bind, unbind } from 'wanakana/domUtils';

import { Input } from './styles';

class JapaneseInput extends React.Component {
  componentDidMount() {
    bind(this.imeInput);
  }

  componentWillUnmount() {
    unbind(this.imeInput);
  }

  render() {
    const { id, type, label, input, ...rest } = this.props;
    return (
      <Input
        innerRef={(node) => { this.imeInput = node; }}
        lang="ja"
        id={id}
        type={type}
        placeholder={label}
        {...input}
        autoCapitalize="none"
        autoCorrect="none"
        autoComplete="off"
        spellCheck="false"
        {...rest}
      />
    );
  }
}

JapaneseInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default JapaneseInput;
