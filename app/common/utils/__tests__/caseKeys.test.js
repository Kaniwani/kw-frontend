import { snakeCaseKeys, camelCaseKeys } from '../caseKeys';

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
