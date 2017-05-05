import React from 'react';
import { shallow } from 'enzyme';
import MultiLogin from '../index';
import {
  Wrapper,
  Form,
  SelectList,
  SelectListItem,
  Label,
  Input,
  SelectedPointer,
  SubmitButton,
} from '../styles';

describe('<MultiLogin />', () => {
  it('MultiLogin match baseline snapshot', () => {
    expect(shallow(<MultiLogin />)).toMatchSnapshot();
  });
  it('MultiLogin.Wrapper should match snapshot', () => {
    expect(shallow(<Wrapper
      loginSelected
      registerSelected={false}
      resetSelected={false}
    />)).toMatchSnapshot();
  });
  it('MultiLogin.Form should match snapshot', () => {
    expect(shallow(<Form />)).toMatchSnapshot();
  });
  it('MultiLogin.SelectList should match snapshot', () => {
    expect(shallow(<SelectList />)).toMatchSnapshot();
  });
  it('MultiLogin.SelectListItem should match snapshot', () => {
    expect(shallow(<SelectListItem isActive />)).toMatchSnapshot();
  });
  it('MultiLogin.Label should match snapshot', () => {
    expect(shallow(<Label />)).toMatchSnapshot();
  });
  it('MultiLogin.Input should match snapshot', () => {
    expect(shallow(<Input />)).toMatchSnapshot();
  });
  it('MultiLogin.SelectedPointer should match snapshot', () => {
    expect(shallow(<SelectedPointer registerSelected />)).toMatchSnapshot();
  });
  it('MultiLogin.SubmitButton should match snapshot', () => {
    expect(shallow(<SubmitButton plainButton type="submit">Submit</SubmitButton>)).toMatchSnapshot();
  });
});
