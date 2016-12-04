import { fromJS } from 'immutable';

import {
  selectInputText,
  selectInputDisabled,
  selectAnswerMatches,
  selectAnswerMarked,
  selectAnswerValid,
 } from '../selectors';

describe('selectAnswerMatches', () => {
  const selector = selectAnswerMatches();
  it('should select answer matches', () => {
    const matches = true;
    const mockedState = fromJS({
      answer: {
        matches,
      },
    });
    expect(selector(mockedState)).toEqual(matches);
  });
});

describe('selectInputText', () => {
  const selector = selectInputText();
  it('should select input text', () => {
    const text = 'input';
    const mockedState = fromJS({
      answer: {
        text,
      },
    });
    expect(selector(mockedState)).toEqual(text);
  });
});

describe('selectInputDisabled', () => {
  const selector = selectInputDisabled();
  it('should select input disabled', () => {
    const disabled = true;
    const mockedState = fromJS({
      answer: {
        disabled,
      },
    });
    expect(selector(mockedState)).toEqual(disabled);
  });
});

describe('selectAnswerMarked', () => {
  const selector = selectAnswerMarked();
  it('should select answer marked', () => {
    const marked = true;
    const mockedState = fromJS({
      answer: {
        marked,
      },
    });
    expect(selector(mockedState)).toEqual(marked);
  });
});

describe('selectAnswerValid', () => {
  const selector = selectAnswerValid();
  it('should select answer valid', () => {
    const valid = true;
    const mockedState = fromJS({
      answer: {
        valid,
      },
    });
    expect(selector(mockedState)).toEqual(valid);
  });
});
