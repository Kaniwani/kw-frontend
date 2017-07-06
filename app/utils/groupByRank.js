import { SRS_RANKS } from 'shared/constants';

function groupByRank(entries = []) {
  const ranks = {
    [SRS_RANKS.ONE]: [],
    [SRS_RANKS.TWO]: [],
    [SRS_RANKS.THREE]: [],
    [SRS_RANKS.FOUR]: [],
    [SRS_RANKS.FIVE]: [],
  };
  entries.forEach((entry) => {
    ranks[entry.streakName].push(entry);
  });

  return ranks;
}

export default groupByRank;
