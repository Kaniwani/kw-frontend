/**
*
* ExitQuiz
*
*/

import React from 'react';
import Icon from 'components/Icon';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  margin-top: .5em;
`;

function ExitQuiz() {
  return (
    <Button type="button" title="Exit quiz and view summary">
      <Icon name="BACK" size="2rem" />
    </Button>
  );
}

export default ExitQuiz;
