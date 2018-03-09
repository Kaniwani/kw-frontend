import React from 'react';
import PropTypes from 'prop-types';

import { green, red } from 'common/styles/colors';

import { Block, ToggleLabel, ToggleSwitch, ToggleDisplay, Note } from './styles';

const TRACK_WIDTH = 3;
const TRACK_HEIGHT = 1.3;

const getSizes = (size) => {
  const trackHeight = TRACK_HEIGHT * size;
  const trackWidth = TRACK_WIDTH * size;
  let switchWidth = trackWidth / 2 - 0.2;
  switchWidth = switchWidth > trackHeight ? trackHeight : switchWidth;

  return {
    trackHeight,
    trackWidth,
    switchWidth,
    switchHeight: trackHeight,
  };
};

ToggleField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
  checkedColor: PropTypes.string,
  uncheckedColor: PropTypes.string,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

ToggleField.defaultProps = {
  size: 1,
  checkedColor: green[5],
  uncheckedColor: red[5],
  note: '',
};

function ToggleField({ input, label, size, checkedColor, uncheckedColor, note }) {
  return (
    <Block>
      <ToggleLabel htmlFor={input.name}>
        <ToggleSwitch id={input.name} type="checkbox" checked={input.value} {...input} />
        <ToggleDisplay
          checkedColor={checkedColor}
          uncheckedColor={uncheckedColor}
          {...getSizes(size)}
        />
        <span>{label || input.name}</span>
      </ToggleLabel>
      {note && <Note>{note}</Note>}
    </Block>
  );
}

export default ToggleField;
