import React from 'react';
import { shallow, mount } from 'enzyme';
import * as fakeRaf from 'fake-raf';

import ScrollToTop from '../index';

describe('<ScrollToTop />', () => {
  it('should match the baseline snapshot', () => {
    expect(shallow(<ScrollToTop />)).toMatchSnapshot();
  });

  it('should add eventListener when mounted', () => {
    const addSpy = jest.spyOn(window, 'addEventListener').mockImplementation(() => {});
    const renderedComponent = mount(<ScrollToTop />);
    renderedComponent.mount();
    expect(addSpy).toHaveBeenCalled();
  });

  it('should remove eventListener when unmounted', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener').mockImplementation(() => {});
    const renderedComponent = mount(<ScrollToTop />);
    renderedComponent.unmount();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should scroll when clicked', () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const renderedComponent = mount(<ScrollToTop />);
    fakeRaf.use();
    renderedComponent.simulate('click');
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    fakeRaf.restore();
    scrollSpy.mockRestore();
  });

  it('should not scroll when clicked if already scrolling', () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const renderedComponent = mount(<ScrollToTop />);
    renderedComponent.setState({ isVisible: true, isScrolling: true });
    renderedComponent.simulate('click');
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('should unset isScrolling if no longer visible ', () => {
    const renderedComponent = mount(<ScrollToTop />);
    renderedComponent.setState({ isVisible: false });
    expect(renderedComponent.state('isScrolling')).toBe(false);
  });
});
