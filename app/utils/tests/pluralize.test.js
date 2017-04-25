import pluralize from '../pluralize';

describe('pluralize', () => {
  it('should return the given string if no arguments', () => {
    expect(pluralize('fhqwhgads')).toBe('fhqwhgads');
  });

  it('should have sane defaults', () => {
    expect(pluralize('dog', 0)).toBe('dogs');
    expect(pluralize('dog', 1)).toBe('dog');
    expect(pluralize('dog', 2)).toBe('dogs');
    expect(pluralize('dog', 3)).toBe('dogs');
    expect(pluralize('dog', 32)).toBe('dogs');
  });

  it('should handle negative numbers', () => {
    expect(pluralize('dog', -1)).toBe('dog');
    expect(pluralize('dog', -2)).toBe('dogs');
    expect(pluralize('dog', -3)).toBe('dogs');
    expect(pluralize('dog', -23454)).toBe('dogs');
  });

  it('should handle a custom schema', () => {
    const schema = {
      single: 'person',
      plural: 'people',
    };
    expect(pluralize('person', 0, schema)).toBe('people');
    expect(pluralize('person', 1, schema)).toBe('person');
    expect(pluralize('person', 2, schema)).toBe('people');
    expect(pluralize('person', 3252, schema)).toBe('people');
  });
});
