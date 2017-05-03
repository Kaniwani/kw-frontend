import React from 'react';
import { shallow } from 'enzyme';
import { PARTS_OF_SPEECH } from 'shared/constants';
import TagsList from '../index';

describe('<TagsList />', () => {
  it('should not render any children if no items provided', () => {
    expect(shallow(<TagsList />)).toMatchSnapshot();
  });
  it('should match PARTS_OF_SPEECH constants', () => {
    expect(shallow(<TagsList tags={PARTS_OF_SPEECH} />)).toMatchSnapshot();
  });
  it('should set colors for common and jlpt tags', () => {
    expect(shallow(<TagsList tags={['Common', 'JLPT N1']} />)).toMatchSnapshot();
  });
});
