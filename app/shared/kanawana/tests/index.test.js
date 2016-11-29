import kanawana from '../index'; // eslint-disable-line no-unused-vars

/* eslint-disable no-undef */
/* since { describe, it, test, expect } etc aren't explicitly imported from jest */

describe('browser environment works', () => {
  it('window exists', () => expect(window).toBeDefined());
  it('kanawana exists', () => expect(window.kanawana).toBeDefined());
});

describe('only exported functions are accessible', () => {
  it('should be able to call window isKana()', () => expect(window.kanawana.isKana('ふフ')).toBe(true));
  it('should not be able to call window isMixed()', () => expect(window.kanawana.isMixed).not.toBeDefined());
});
