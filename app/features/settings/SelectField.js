import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { titleCase } from 'voca';

import { Block, Label, Note } from './styles';

const SelectField = ({ input, options, label, note }) => (
  <Block>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
      <select id={input.name} {...input}>
        {options.map((text) => (
          <option key={cuid()} value={text}>
            {titleCase(text)}
          </option>
        ))}
      </select>
    </Label>
    {note && <Note constrain>{note}</Note>}
  </Block>
);
SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

SelectField.defaultProps = {
  note: '',
};

export default SelectField;
