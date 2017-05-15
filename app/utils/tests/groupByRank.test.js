import { SRS_RANKS } from 'shared/constants';
import groupByRank from '../groupByRank';

const items = Array.from({ length: 25 }).map((v, i) => ({
  id: i,
  session: { streak: Math.floor(i * 0.5) },
}));

describe('groupByRank()', () => {
  it('should group entries under named srs ranks', () => {
    const grouped = groupByRank(items);
    expect(grouped).toMatchSnapshot();
    expect(grouped[SRS_RANKS.ONE].length).toMatchSnapshot();
    expect(grouped[SRS_RANKS.TWO].length).toMatchSnapshot();
    expect(grouped[SRS_RANKS.THREE].length).toMatchSnapshot();
    expect(grouped[SRS_RANKS.FOUR].length).toMatchSnapshot();
    expect(grouped[SRS_RANKS.FIVE].length).toMatchSnapshot();
  });
});