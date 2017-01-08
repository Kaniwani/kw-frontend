import React, { PropTypes } from 'react';

/**
 * Renders a redux form input field
 * extraAttrs can be used for things like: autoComplete="off"
 */
const ReduxFormInput = ({ id, type, label, input, ...extraAttrs }) =>
  <input
    id={id}
    type={type}
    placeholder={label}
    {...input}
    {...extraAttrs}
  />;

ReduxFormInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ReduxFormInput;
