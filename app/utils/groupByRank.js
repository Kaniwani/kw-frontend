import { SRS_RANKS } from 'shared/constants';
import getSrsRankName from 'utils/getSrsRankName';

function groupByRank(items = []) {
  const ranks = {
    [SRS_RANKS.ZERO]: [],
    [SRS_RANKS.ONE]: [],
    [SRS_RANKS.TWO]: [],
    [SRS_RANKS.THREE]: [],
    [SRS_RANKS.FOUR]: [],
    [SRS_RANKS.FIVE]: [],
  };

  items.forEach(({ id, streak }) => {
    ranks[getSrsRankName(streak)].push(id);
  });

  return ranks;
}

export default groupByRank;
