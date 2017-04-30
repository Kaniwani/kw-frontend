import * as URLS from '../urls';

describe('URLS', () => {
  Object.values(URLS).forEach((url) => {
    it(`${url} should match baseline snapshot`, () => {
      const result = typeof url === 'string' ? url : url('testParam');
      expect(result).toMatchSnapshot();
    });
  });
});
