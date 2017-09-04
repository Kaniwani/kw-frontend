import { readings } from 'shared/testTables';
import { flatMap } from 'lodash';
import condenseReadings from 'utils/condenseReadings';

import splitSentenceByMatch from '../splitSentenceByMatch';

describe('splitSentenceByMatch()', () => {
  it('should have a safe default', () => {
    expect(splitSentenceByMatch()).toEqual({ head: '', match: '', tail: '' });
  });

  it('should match testTables', () => {
    flatMap(Object.values(readings), condenseReadings)
      .forEach(({ sentenceJa, character, kana }) => {
        expect(splitSentenceByMatch(sentenceJa, character, kana)).toMatchSnapshot();
      });
  });
});
