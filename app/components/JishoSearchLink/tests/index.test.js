import { shallow } from 'enzyme';
import React from 'react';

import JishoSearchLink from '../index';

const keyword = 'かな';

const renderComponent = (props = {}) => shallow(
  <JishoSearchLink {...props} />,
);

describe('<JishoSearchLink />', () => {
  it('should match base snapshot', () => {
    const renderedComponent = renderComponent({ keyword });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt a visuallyHidden prop', () => {
    const renderedComponent = renderComponent({ keyword, visuallyHidden: true });
    expect(renderedComponent.prop('visuallyHidden')).toEqual(true);
  });
});
