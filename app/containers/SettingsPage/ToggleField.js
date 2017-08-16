import React from 'react';
import PropTypes from 'prop-types';

import { Block, Label, Note } from './styles';

const ToggleField = ({ input, label, note }) => (
  <Block>
    <Label htmlFor={input.namename}>
      <span>{label || input.name}</span>
      <input id={input.namename} type="checkbox" {...input} checked={input.value} />
    </Label>
    {note && <Note>{note}</Note>}
  </Block>
);
ToggleField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

ToggleField.defaultProps = {
  note: '',
};

export default ToggleField;
