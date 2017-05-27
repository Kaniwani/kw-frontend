import stripLeadingTilde from '../stripLeadingTilde';

describe('stripLeadingTilde()', () => {
  it('should have a safe default', () => {
    expect(stripLeadingTilde()).toEqual('');
    expect(stripLeadingTilde('剤')).toEqual('剤');
  });

  it('should strip JA tilde', () => {
    expect(stripLeadingTilde('〜剤')).toEqual('剤');
    expect(stripLeadingTilde('〜かた')).toEqual('かた');
  });

  it('should strip EN tilde', () => {
    expect(stripLeadingTilde('~剤')).toEqual('剤');
    expect(stripLeadingTilde('~かた')).toEqual('かた');
  });
});
