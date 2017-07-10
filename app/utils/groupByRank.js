import { SRS_RANKS } from 'shared/constants';

function groupByRank(items = []) {
  const ranks = {
    [SRS_RANKS.ONE]: [],
    [SRS_RANKS.TWO]: [],
    [SRS_RANKS.THREE]: [],
    [SRS_RANKS.FOUR]: [],
    [SRS_RANKS.FIVE]: [],
  };

  items.forEach(({ id, streakName }) => {
    ranks[streakName].push(id);
  });

  return ranks;
}

export default groupByRank;
