import { AnswerInput } from '../index';
import Input from '../Input';

import { shallow } from 'enzyme';
import React from 'react';

describe('<AnswerInput />', () => {
  it('Expect it to render', () => {
    const renderedComponent = shallow(
      <AnswerInput
        text={'text'}
        onChangeInput={() => {}}
        disabled
        marked
        valid
        matches
      />,
    );
    expect(renderedComponent.find(<Input />)).toBeDefined();
  });
});
