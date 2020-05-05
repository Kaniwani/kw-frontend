import React from 'react';
import PropTypes from 'prop-types';

import { Block, Label, Note } from './styles';

const RangeField = ({ input, min, max, step, label, note, display }) => (
  <Block>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
      <input id={input.name} type="range" {...input} min={min} max={max} step={step} />
      <div>{display(input.value)}</div>
    </Label>
    {note && <Note constrain>{note}</Note>}
  </Block>
);

RangeField.propTypes = {
  input: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  display: PropTypes.func,
};

RangeField.defaultProps = {
  display: (x) => x,
  note: '',
};

export default RangeField;
