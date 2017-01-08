import React, { PropTypes } from 'react';
import { bind, unbind } from 'kanawana';
import { StyledJapaneseInput } from './styles';

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
      <StyledJapaneseInput
        innerRef={(node) => { this.imeInput = node; }}
        lang="ja"
        id={id}
        type={type}
        placeholder={label}
        {...input}
        autoCapitalize="off"
        autoCorrect="off"
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
