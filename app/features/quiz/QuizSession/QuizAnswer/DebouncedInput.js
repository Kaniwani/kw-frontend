import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { toKana } from 'wanakana';
import { endsWith } from 'voca';
import { Input } from './styles';

export class DebouncedInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    setInputFieldRef: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isMarked: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.lastPropValue = props.value;

    this.debouncedOnChange = debounce((value) => {
      props.onChange(value);
    }, 200);

    this.handleChange = (event) => {
      event.persist();
      // FIXME: this probably won't handle composition updates since we haven't used an eventListener
      // need to double-check with Microsoft IME
      // should potentially use wk.bind/unbind in cdm/cwm
      const newValue = toKana(event.target.value.toLowerCase(), { IMEMode: true });
      this.setState({ value: newValue });
      this.debouncedOnChange(newValue);
    };
  }

  componentWillReceiveProps(nextProps) {
    // only force replace local value if empty default value is passed back in or trailing n has been corrected
    if (nextProps.value !== this.lastPropValue) {
      if (nextProps.value === '') {
        this.setState({ value: '' });
      }
      if (endsWith(this.lastPropValue, 'n') && endsWith(nextProps.value, 'ん')) {
        this.setState({ value: nextProps.value });
      }
    }
  }

  getValue() {
    const value = this.props.value !== this.lastPropValue ? this.props.value : this.state.value;
    this.lastPropValue = this.props.value;
    return value;
  }

  render() {
    const { setInputFieldRef, isFocused, isDisabled, isMarked, isValid } = this.props;
    return (
      <Input
        innerRef={(node) => {
          setInputFieldRef(node);
        }}
        id="answer"
        lang="ja"
        type="text"
        placeholder="答え"
        value={this.getValue()}
        onChange={this.handleChange}
        focus={isFocused}
        disabled={isDisabled}
        marked={isMarked}
        valid={isValid}
        autoFocus={isFocused}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
      />
    );
  }
}

export default DebouncedInput;
