import { shallow, mount } from 'enzyme';
import React from 'react';

import ListItem from '../index';

describe('<ListItem />', () => {
  const content = (<div>Hello world!</div>);

  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(<ListItem item={content} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className', () => {
    const renderedComponent = mount(<ListItem className="test" item={content} />);
    expect(renderedComponent.find('li').prop('className')).toBeDefined();
  });

  it('should render the content passed to it', () => {
    const renderedComponent = mount(
      <ListItem item={content} />
    );
    expect(renderedComponent.contains(content)).toBe(true);
  });
});
