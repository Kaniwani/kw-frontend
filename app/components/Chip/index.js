import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { border } from 'shared/styles/spacing';
import * as colors from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

const Wrapper = styled.div`
  ${fluidType(10, 14)}
  align-items: center;
  background-color: rgb(${(props) => colors[props.bgColor]});
  color: rgb(${(props) => colors[props.textColor]});
  border-radius: ${border.radius};
  display: inline-flex;
  max-width: 100%;
  padding: .3em .6em;
  margin-top: .3em;
  margin-right: .3em;
  text-decoration: none;
  vertical-align: middle;
`;

const Text = styled.span`
  margin-left: .2em;
  margin-right: .2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function Chip({ item, ...styleProps }) {
  return (
    <Wrapper {...styleProps}>
      <Text>{item}</Text>
    </Wrapper>
  );
}

Chip.propTypes = {
  item: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(Object.keys(colors)),
  bgColor: PropTypes.oneOf(Object.keys(colors)),
};

Chip.defaultProps = {
  textColor: 'blackLight',
  bgColor: 'white',
};

export default Chip;
