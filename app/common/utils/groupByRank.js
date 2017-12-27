import { SRS_RANKS } from 'common/constants';
import getSrsRankName from 'common/utils/getSrsRankName';

function groupByRank(items = []) {
  const ranks = {
    [SRS_RANKS.ZERO]: [],
    [SRS_RANKS.ONE]: [],
    [SRS_RANKS.TWO]: [],
    [SRS_RANKS.THREE]: [],
    [SRS_RANKS.FOUR]: [],
    [SRS_RANKS.FIVE]: [],
  };

  items.forEach((item) => {
    ranks[getSrsRankName(item.streak)].push(item.id);
  });

  return ranks;
}

export default groupByRank;
