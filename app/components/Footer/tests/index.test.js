import { shallow } from 'enzyme';
import React from 'react';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render the footer', () => {
    const renderedComponent = shallow(
      <Footer />,
    );
    expect(renderedComponent.contains(
      <section>
        I’m a Footer!
      </section>,
    )).toBe(true);
  });
});
