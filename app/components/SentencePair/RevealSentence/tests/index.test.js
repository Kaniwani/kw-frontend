import 'jest-styled-components';
import React from 'react';
import { render } from 'enzyme';
import RevealSentence from '../index';

describe('<RevealSentence />', () => {
  it('should match baseline snapshot', () => {
    expect(render(<RevealSentence />)).toMatchSnapshot();
  });
});
