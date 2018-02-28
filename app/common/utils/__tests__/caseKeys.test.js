import { snakeCaseKeys, camelCaseKeys, deepMapKeys } from '../caseKeys';

describe('caseKeys', () => {
  const camel = {
    someKey: {
      someNestedKey: {
        deeperKey: 24,
      },
    },
    someOtherKey: 'valNotConverted',
  };

  const snake = {
    some_key: { some_nested_key: { deeper_key: 24 } },
    some_other_key: 'valNotConverted',
  };

  it('converts deeply to snakeCase', () => {
    expect(snakeCaseKeys(camel)).toEqual(snake);
  });

  it('converts deeply to camelCase', () => {
    expect(camelCaseKeys(snake)).toEqual(camel);
  });
});

describe('deepMapKeys(object, mapFn)', () => {
  const caps = (key) => key.toUpperCase();

  describe('object: any', () => {
    it('transforms keys of simple object', () => {
      expect(deepMapKeys({ one: 1, two: 2 }, caps)).toEqual({ ONE: 1, TWO: 2 });
    });

    it('transforms keys of object with nested objects/arrays', () => {
      expect(deepMapKeys({ one: 1, obj: { two: 2, three: 3 }, arr: [4, 5] }, caps)).toEqual({
        ONE: 1,
        OBJ: { TWO: 2, THREE: 3 },
        ARR: [4, 5],
      });
    });

    it('transforms keys of array with nested object/array', () => {
      expect(deepMapKeys([1, { two: 2, three: 3, arr: [4, { five: 5 }] }], caps)).toEqual([
        1,
        { TWO: 2, THREE: 3, ARR: [4, { FIVE: 5 }] },
      ]);
    });

    it('transforms an object with circular references', () => {
      const obj = { one: 1, arr: [2, 3], self: null, arr2: null };
      obj.self = obj;
      obj.arr2 = obj.arr;

      const exp = { ONE: 1, ARR: [2, 3], SELF: null, ARR2: null };
      exp.SELF = exp;
      exp.ARR2 = exp.ARR;

      expect(deepMapKeys(obj, caps)).toEqual(exp);
    });
  });
});
