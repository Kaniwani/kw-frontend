import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { borderRadius } from 'shared/styles/sizing';
import * as COLORS from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

const Li = styled.li`
  ${fluidType(10, 14)}
  display: inline-flex;
  max-width: 100%;
  padding: .2em .6em .2em;
  margin-top: .3em;
  margin-right: .3em;
  text-decoration: none;
  vertical-align: middle;
  align-items: center;
  background-color: rgb(${(props) => COLORS[props.bgColor]});
  color: rgb(${(props) => COLORS[props.textColor]});
  border-radius: ${borderRadius};
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
    <Li {...styleProps}>
      <Text>{item}</Text>
    </Li>
  );
}

Chip.propTypes = {
  item: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(Object.keys(COLORS)),
  bgColor: PropTypes.oneOf(Object.keys(COLORS)),
};

Chip.defaultProps = {
  textColor: 'blackLight',
  bgColor: 'white',
};

export default Chip;
