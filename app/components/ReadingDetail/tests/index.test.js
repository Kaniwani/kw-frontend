import React from 'react';
import { shallow } from 'enzyme';
import ReadingDetail from '../index';

describe('<ReadingDetail />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ReadingDetail
        detailLevel="HIGH"
        character="近"
        kana={['ちか', 'じか']}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
