import { fromJS } from 'immutable';

import selectAnswerInputDomain, {
  selectInputText,
  selectInputDisabled,
  selectkeysInListMatch,
  selectAnswerMarked,
  selectAnswerValid,
 } from '../selectors';

describe('selectAnswerInputDomain', () => {
  it('should select answer input domain', () => {
    const expectedState = fromJS({ key1: 'value' });
    const mockedState = fromJS({
      review: {
        answer: {
          key1: 'value',
        },
      },
    });
    expect(selectAnswerInputDomain()(mockedState)).toEqual(expectedState);
  });
});

describe('selectkeysInListMatch', () => {
  it('should select answer matches', () => {
    const matches = true;
    const mockedState = fromJS({
      review: {
        answer: {
          matches,
        },
      },
    });
    expect(selectkeysInListMatch()(mockedState)).toEqual(matches);
  });
});

describe('selectInputText', () => {
  it('should select input text', () => {
    const inputText = 'input';
    const mockedState = fromJS({
      review: {
        answer: {
          inputText,
        },
      },
    });
    expect(selectInputText()(mockedState)).toEqual(inputText);
  });
});

describe('selectInputDisabled', () => {
  it('should select input disabled', () => {
    const inputDisabled = true;
    const mockedState = fromJS({
      review: {
        answer: {
          inputDisabled,
        },
      },
    });
    expect(selectInputDisabled()(mockedState)).toEqual(inputDisabled);
  });
});

describe('selectAnswerMarked', () => {
  it('should select answer marked', () => {
    const marked = true;
    const mockedState = fromJS({
      review: {
        answer: {
          marked,
        },
      },
    });
    expect(selectAnswerMarked()(mockedState)).toEqual(marked);
  });
});

describe('selectAnswerValid', () => {
  it('should select answer valid', () => {
    const valid = true;
    const mockedState = fromJS({
      review: {
        answer: {
          valid,
        },
      },
    });
    expect(selectAnswerValid()(mockedState)).toEqual(valid);
  });
});
