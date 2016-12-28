import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { borderRadius } from 'shared/styles/sizing';
import * as COLORS from 'shared/styles/colors';

const Li = styled.li`
  ${fluidType(10, 16, 300, 1800)}
  display: inline-flex;
  max-width: 100%;
  padding: .25em .6em;
  margin: .15em;
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
