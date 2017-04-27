import * as fakeRaf from 'fake-raf'; // mocked requestAnimationFrame
import smoothScrollY from '../smoothScrollY';

describe('smoothScrollY()', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(window, 'scrollTo');
    fakeRaf.use();
  });

  afterEach(() => {
    spy.mockRestore();
    fakeRaf.restore();
  });

  it('should call window.scrollTo()', () => {
    smoothScrollY();
    expect(spy).toHaveBeenCalled();
    fakeRaf.step();
    expect(spy).toHaveBeenCalledTimes(2);
    fakeRaf.step();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should end when timing is diminished', () => {
    smoothScrollY(0, 10);
    expect(spy).toHaveBeenCalled();
    fakeRaf.step();
    fakeRaf.step();
    fakeRaf.step();
    fakeRaf.step();
    fakeRaf.step();
    fakeRaf.step();
    expect(spy).toHaveBeenCalledTimes(7);
    // step some more, but no more scrolls should fire
    fakeRaf.step();
    fakeRaf.step();
    expect(spy).toHaveBeenCalledTimes(7);
  });
});
