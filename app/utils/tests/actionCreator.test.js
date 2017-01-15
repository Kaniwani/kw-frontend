import actionCreator from '../actionCreator';

describe('actionCreator() returns a function that creates an action with the given type', () => {
  const createAction = actionCreator('FOOBAR');
  const action = createAction();
  it('action contains the type and payload', () => {
    expect(Object.keys(action).length).toEqual(2);
  });
  it('the type is correct', () => {
    expect(action.type).toEqual('FOOBAR');
  });
  it('the payload is empty', () => {
    expect(Object.keys(action.payload).length).toEqual(0);
  });
});

describe('actionCreator() returns a function that creates an action with the given type and parameters', () => {
  const createAction = actionCreator('FOO', 'bar', 'baz', 'qux');
  const action = createAction('bar', 'baz', { show: true });
  it('the payload contains three parameters', () => {
    expect(Object.keys(action.payload).length).toEqual(3);
  });
  it('bar payload exists', () => {
    expect(action.payload.bar).toEqual('bar');
  });
  it('baz payload exists', () => {
    expect(action.payload.baz).toEqual('baz');
  });
  it('qux payload exists', () => {
    expect(action.payload.qux).toEqual({ show: true });
  });
});
