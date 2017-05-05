import React from 'react';
import { shallow, render } from 'enzyme';
import MultiLogin from '../index';
import Input from '../Input';
import {
  Form,
  SelectList,
  SelectListItem,
  Label,
  SelectedPointer,
  SubmitButton,
} from '../styles';

describe('<MultiLogin />', () => {
  it('MultiLogin match baseline snapshot', () => {
    expect(shallow(<MultiLogin />)).toMatchSnapshot();
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
    expect(shallow(<Label for="user" />)).toMatchSnapshot();
  });
  it('MultiLogin.Input should match snapshot', () => {
    expect(render(<Input name="user" placeholder="Username or Email" />)).toMatchSnapshot();
    expect(render(<Input isHidden name="user" placeholder="Username or Email" />)).toMatchSnapshot();
  });
  it('MultiLogin.SelectedPointer should match snapshot', () => {
    expect(shallow(<SelectedPointer />)).toMatchSnapshot();
    expect(shallow(<SelectedPointer position="left" />)).toMatchSnapshot();
    expect(shallow(<SelectedPointer position="right" />)).toMatchSnapshot();
  });
  it('MultiLogin.SubmitButton should match snapshot', () => {
    expect(shallow(<SubmitButton type="submit">Submit</SubmitButton>)).toMatchSnapshot();
  });
});
