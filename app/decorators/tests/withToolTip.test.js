import React from 'react';
import { render } from 'enzyme';
import withTooltip from '../withTooltip';

const SimpleDiv = ({ foo, ...props }) => <div {...props}>{foo}</div>; // eslint-disable-line react/prop-types
const Enhanced = withTooltip(SimpleDiv);

describe('<withTooltip />', () => {
  it('should have default props', () => {
    const RenderedComponent = render(
      <Enhanced data-tip="I'm required" />
    );
    expect(RenderedComponent).toMatchSnapshot();
  });

  it('should adopt tooltip props', () => {
    const RenderedComponent = render(
      <Enhanced
        data-tip="Hello there"
        data-for="tooltipId"
        data-class="custom-class"
        data-place="left"
        data-type="success"
        data-delay-show={100}
        data-delay-hide={200}
      />
    );
    expect(RenderedComponent).toMatchSnapshot();
  });

  it('should adopt component props', () => {
    const RenderedComponent = render(
      <Enhanced
        data-tip="Hello again"
        foo="foo"
      />
    );
    expect(RenderedComponent).toMatchSnapshot();
  });
});
