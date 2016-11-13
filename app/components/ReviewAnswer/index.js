/**
*
* ReviewAnswer
*
*/

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: table-row;
  width: 100%;
`;

const Input = styled.input`
  font-size: 2rem;
  border: 2px solid black;
  border-radius: 5px;
  padding: .1em;
  text-align: center;
`;

function ReviewAnswer() {
  return (
    <Wrapper>
      <Input type="text" placeholder="答え" />
    </Wrapper>
  );
}

export default ReviewAnswer;
