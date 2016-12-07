import getSrsRankName from '../getSrsRankName';
import { SRS_RANKS } from 'shared/constants';

describe('getSrsRankName', () => {
  it('should default to rank one with no params', () =>
    expect(getSrsRankName()).toBe(SRS_RANKS.ONE));

  it('should return expected ranks for given streak numbers', () => {
    expect(getSrsRankName(9)).toBe(SRS_RANKS.FIVE);
    expect(getSrsRankName(8)).toBe(SRS_RANKS.FOUR);
    expect(getSrsRankName(7)).toBe(SRS_RANKS.THREE);
    expect(getSrsRankName(5)).toBe(SRS_RANKS.TWO);
    expect(getSrsRankName(3)).toBe(SRS_RANKS.ONE);
    expect(getSrsRankName(0)).toBe(SRS_RANKS.ONE);
  });
});
