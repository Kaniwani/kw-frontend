import blockEvent from '../blockEvent';

describe('blockEvent()', () => {
  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };

  it('should call preventDefault()', () => {
    blockEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call stopPropagation()', () => {
    blockEvent(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should return the event', () => {
    expect(blockEvent(event)).toEqual(event);
  });
});
