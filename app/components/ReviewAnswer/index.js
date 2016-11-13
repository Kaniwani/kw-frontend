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
  color: rebeccaPurple,
`;

function ReviewAnswer() {
  return (
    <Wrapper>
      <Input type="text" placeholder="答え" />
    </Wrapper>
  );
}

export default ReviewAnswer;
