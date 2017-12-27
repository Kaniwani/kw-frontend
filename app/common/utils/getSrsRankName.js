import { SRS_RANKS } from 'common/constants';

/**
 * Returns name of srs rank from provided number
 *
 * @param  {Number} streak Current srs rank
 * @return {String} Rank name
 */
export default function getSrsRankName(streak) {
  switch (true) {
    case (streak > 8): return SRS_RANKS.FIVE;
    case (streak > 7): return SRS_RANKS.FOUR;
    case (streak > 6): return SRS_RANKS.THREE;
    case (streak > 4): return SRS_RANKS.TWO;
    case (streak > 0): return SRS_RANKS.ONE;
    default: return SRS_RANKS.ZERO;
  }
}
