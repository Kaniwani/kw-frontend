import markAllAsDaemon from '../markAllAsDaemon';

describe('markAllAsDaemon()', () => {
  it('should match snapshot', () => {
    expect(markAllAsDaemon([{}, {}])).toMatchSnapshot();
  });
});
