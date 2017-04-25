import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import randomHexColor from 'utils/randomHexColor';

const Block = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  margin: ${({ margin }) => margin};
  background-color: ${({ color }) => color};
`;

function ColorBlock({ color, ...rest }) {
  return (
    <Block color={color || randomHexColor()} {...rest} />
  );
}

ColorBlock.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string,
};

ColorBlock.defaultProps = {
  size: '100px',
  margin: '.5em',
  color: false, // force randomHexColor() on render
};

export default ColorBlock;
