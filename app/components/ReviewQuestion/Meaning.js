import React, { Children, PropTypes } from 'react';
import styled from 'styled-components';
import { white, purpleDark } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

const Wrapper = styled.div`
  flex: 999 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H1 = styled.h1`
  ${fluidType(20, 50, 300, 2000)}
  color: rgb(${white});
  margin: 0;
  font-weight: 700;
  letter-spacing: -1px;
  text-shadow: 1px 2px 4px rgb(${purpleDark});
  padding: 10vh 5vw;
`;

const Meaning = (props) => (
  <Wrapper>
    <H1>{Children.toArray(props.children)}</H1>
  </Wrapper>
);

Meaning.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Meaning;
