
import addSynonymFormReducer from '../reducer';
import { fromJS } from 'immutable';

describe('addSynonymFormReducer', () => {
  it('returns the initial state', () => {
    expect(addSynonymFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
