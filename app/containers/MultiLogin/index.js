import React from 'react';

import FormSelector from './FormSelector';
import Form from './Form';
import { Wrapper } from './styles';

function MultiLogin() {
  return (
    <Wrapper>
      <FormSelector />
      <Form />
    </Wrapper>
  );
}

export default MultiLogin;
