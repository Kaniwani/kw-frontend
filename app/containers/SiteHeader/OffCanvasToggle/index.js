import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';

import { Toggle } from './styles';

OffCanvasToggle.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};

function OffCanvasToggle({ handleToggle }) {
  return (
    <Toggle name="MENU" title="Open menu" onClick={handleToggle} size="2.5em" />
  );
}

const isHidden = ({ isVisible }) => !isVisible;
const enhance = branch(
  isHidden,
  renderNothing,
);

export default enhance(OffCanvasToggle);
