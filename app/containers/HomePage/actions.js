import {
  TYPES,
  defaultAction,
} from '../actions';

describe('HomePage actions', () => {
  describe('Default Action', () => {
    it('has a type of APP/HOMEPAGE/DEFAULT', () => {
      expect(defaultAction()).toEqual({ type: APP / HOMEPAGE / DEFAULT });
      expect(defaultAction()).toMatchSnapshot();
    });
  });
});
