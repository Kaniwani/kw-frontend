/**
 * Test the HomePage
 */


import { shallow, mount } from 'enzyme';
import React from 'react';

import { HomePage } from '../index';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage loading />
    );
    expect(renderedComponent.contains(<LoadingIndicator />).toBe(true));
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <HomePage
        loading={false}
        error={{ message: 'Loading failed!' }}
      />
    );
    expect(
      renderedComponent
        .text()
        .indexOf('Something went wrong, please try again!')
      ).toBeGreaterThan(-1);
  });

  it('should render the userData if loading was successful', () => {
    const user = {
      name: 'testname',
      level: 3,
      reviewCount: 2,
      lastWkSyncDate: new Date(),
    };
    const renderedComponent = shallow(
      <HomePage
        user={user}
        error={false}
      />
    );

    expect(renderedComponent.contains(
      <div>
        <H2>Welcome Back testname.</H2>
        <p>You are level 3.</p>
        <p>You have 2 reviews waiting.</p>
        <p>You last synced with WK on {new Date().toDateString()}.</p>
      </div>
    )).toBe(true);
  });

 /* describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toExist();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });

  describe('onSubmitForm', () => {
    it('should be injected', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      expect(result.onSubmitForm).toExist();
    });

    it('should dispatch loadUserData when called', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      result.onSubmitForm();
      expect(dispatch).toHaveBeenCalledWith(loadUserData());
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = expect.createSpy();
      const result = mapDispatchToProps(() => {});
      const evt = { preventDefault };
      result.onSubmitForm(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });*/
});
