import React from 'react';
import { shallow } from 'enzyme';
import { PARTS_OF_SPEECH } from 'shared/constants';
import PartsOfSpeechList from '../index';

describe('<PartsOfSpeechList />', () => {
  it('should not render any children if no items provided', () => {
    expect(shallow(<PartsOfSpeechList />)).toMatchSnapshot();
  });
  it('should match PARTS_OF_SPEECH constant', () => {
    expect(shallow(<PartsOfSpeechList items={PARTS_OF_SPEECH} />)).toMatchSnapshot();
  });
  it('should set colors for common and jlpt items', () => {
    expect(shallow(<PartsOfSpeechList items={['Common', 'JLPT N1']} />)).toMatchSnapshot();
  });
});
