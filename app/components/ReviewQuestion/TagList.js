import React from 'react';
import styled from 'styled-components';
import List from 'components/List';

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  flex-flow: row wrap;
  justify-content: flex-start;
  z-index: 2;
`;

const TagList = (props) => (
  <Wrapper>
    <List {...props} />
  </Wrapper>
);

export default TagList;
