import { fromJS } from 'immutable';

import selectReviewDomain, {
  selectError,
  selectLoading,
  selectQueue,
  selectCurrent,
  selectCurrentVocab,
  selectCurrentReadings,
  selectCurrentMeaning,
  selectCurrentStreak,
  selectQueueCount,
  selectTotalCount,
  selectCompletedCount,
  selectAnsweredCount,
  selectCorrectCount,
  selectIncorrectCount,
} from '../selectors';

describe('selectReviewDomain', () => {
  it('should select the review state', () => {
    const review = fromJS({
      queue: [],
    });

    const mockedState = fromJS({
      review,
    });

    expect(selectReviewDomain()(mockedState)).toEqual(review);
  });
});

describe('selectQueue', () => {
  it('should select the queue state', () => {
    const queue = fromJS([]);
    const mockedState = fromJS({
      review: {
        queue,
      },
    });
    expect(selectQueue()(mockedState)).toEqual(queue);
  });
});

describe('selectError', () => {
  it('should select the selectError state', () => {
    const error = null;
    const mockedState = fromJS({
      review: {
        error,
      },
    });
    expect(selectError()(mockedState)).toEqual(error);
  });
});

describe('selectLoading', () => {
  it('should select the selectLoading state', () => {
    const loading = null;
    const mockedState = fromJS({
      review: {
        loading,
      },
    });
    expect(selectLoading()(mockedState)).toEqual(loading);
  });
});

describe('selectCompleted', () => {
  it('should select the selectCompleted state', () => {
    const completed = fromJS([{ id: '0' }, { id: '1' }]);
    const mockedState = fromJS({
      review: {
        completed,
      },
    });
    expect(selectCompletedCount()(mockedState)).toEqual(completed.size);
  });
});

describe('selectCurrent', () => {
  it('should select the selectCurrent state', () => {
    const current = fromJS({ id: 1 });
    const mockedState = fromJS({
      review: {
        current,
      },
    });
    expect(selectCurrent()(mockedState)).toEqual(current);
  });
});

describe('selectCurrentVocab', () => {
  it('should select the selectCurrentVocab state', () => {
    const vocabulary = fromJS({});
    const mockedState = fromJS({
      review: {
        current: {
          vocabulary,
        },
      },
    });
    expect(selectCurrentVocab()(mockedState)).toEqual(vocabulary);
  });
});

describe('selectCurrentReadings', () => {
  it('should select the selectCurrentReadings state', () => {
    const readings = fromJS([]);
    const mockedState = fromJS({
      review: {
        current: {
          vocabulary: {
            readings,
          },
        },
      },
    });
    expect(selectCurrentReadings()(mockedState)).toEqual(readings);
  });
});

describe('selectCurrentMeaning', () => {
  it('should select the selectCurrentMeaning state', () => {
    const meaning = fromJS('fhqwhgads');
    const mockedState = fromJS({
      review: {
        current: {
          vocabulary: {
            meaning,
          },
        },
      },
    });
    expect(selectCurrentMeaning()(mockedState)).toEqual(meaning);
  });
});

describe('selectCurrentStreak', () => {
  it('should select the selectCurrentStreak state', () => {
    const streak = fromJS(1);
    const mockedState = fromJS({
      review: {
        current: {
          streak,
        },
      },
    });
    expect(selectCurrentStreak()(mockedState)).toEqual(streak);
  });
});

describe('selectQueueCount', () => {
  it('should select the queue count', () => {
    const queue = fromJS([{ id: 0 }, { id: 1 }]);
    const mockedState = fromJS({
      review: {
        queue,
      },
    });
    expect(selectQueueCount()(mockedState)).toEqual(queue.size);
  });
});

describe('selectTotalCount', () => {
  it('should select the selectTotalCount state', () => {
    const total = 1;
    const mockedState = fromJS({
      review: {
        total,
      },
    });
    expect(selectTotalCount()(mockedState)).toEqual(total);
  });
});

describe('selectAnsweredCount', () => {
  it('should select the selectAnsweredCount state', () => {
    const answeredCount = 2;
    const mockedState = fromJS({
      review: {
        session: {
          correct: 1,
          incorrect: 1,
        },
      },
    });
    expect(selectAnsweredCount()(mockedState)).toEqual(answeredCount);
  });
});

describe('selectCorrectCount', () => {
  it('should select the selectCorrectCount state', () => {
    const correct = fromJS(2);
    const mockedState = fromJS({
      review: {
        session: {
          correct,
        },
      },
    });
    expect(selectCorrectCount()(mockedState)).toEqual(correct);
  });
});

describe('selectIncorrectCount', () => {
  it('should select the selectIncorrectCount state', () => {
    const incorrect = fromJS(3);
    const mockedState = fromJS({
      review: {
        session: {
          incorrect,
        },
      },
    });
    expect(selectIncorrectCount()(mockedState)).toEqual(incorrect);
  });
});
