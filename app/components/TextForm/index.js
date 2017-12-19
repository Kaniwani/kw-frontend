// PREVIOUSLY vocabentrynotes
import React from "react";
import PropTypes from "prop-types";

import Button from "base/Button";

import { Form, TextArea, Controls, Count } from "./styles";

class TextForm extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
  };

  static defaultProps = {
    initialValue: "",
    placeholder: "Typewriter tip tip tip...",
    maxLength: 500,
    rows: 3,
    maxRows: 15,
  };

  state = {
    remaining: this.props.maxLength - this.props.initialValue.length,
    initialValue: this.props.initialValue,
    value: this.props.initialValue,
    isDirty: false,
  };

  onChange = ({ target: { value } }) =>
    this.setState({
      value,
      isDirty: value !== this.props.initialValue,
      remaining: this.props.maxLength - value.length,
    });

  onReset = () => this.setState({ value: this.state.initialValue });

  render() {
    const { value, remaining, isDirty } = this.state;
    const {
      onSubmit, name, placeholder, rows, maxRows, maxLength,
    } = this.props;
    return (
      <Form onSubmit={() => onSubmit(value)}>
        <TextArea
          name={name}
          placeholder={placeholder}
          rows={rows}
          maxRows={maxRows}
          value={value}
          onChange={this.onChange}
          maxLength={maxLength}
        />
        {isDirty && (
          <Controls>
            <Button type="reset" onClick={this.onReset}>
              Undo
            </Button>
            <Button type="submit">Save</Button>
            <Count maxLength={maxLength} remaining={remaining}>
              {remaining}
            </Count>
          </Controls>
        )}
      </Form>
    );
  }
}

export default TextForm;
