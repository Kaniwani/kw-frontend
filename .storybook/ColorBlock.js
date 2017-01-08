import React, { PropTypes } from 'react';
import styled from 'styled-components';
import randomHexColor from 'utils/randomHexColor';

const Block = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
`;

const ColorBlock = ({ color, ...rest }) => <Block color={color || randomHexColor()} {...rest} />;

ColorBlock.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string,
};

ColorBlock.defaultProps = {
  size: '100px',
  margin: '.5em',
};

export default ColorBlock;
