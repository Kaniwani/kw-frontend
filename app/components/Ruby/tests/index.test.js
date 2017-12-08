import 'jest-styled-components';
import React from 'react';
import { render } from 'enzyme';

import Ruby from '../index';

describe('<Ruby />', () => {
  it('no furi provided: render entire reading over character block', () => {
    const renderedComponent = render(<Ruby character="漢字" reading="かんじ" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('furi provided: render readings over related kanji blocks', () => {
    const renderedComponent = render(<Ruby character="漢字" reading="かんじ" furi="0:かん;1:じ" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
