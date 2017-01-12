import * as utils from '../utils';
import { fromJS } from 'immutable';
import { TILDE_EN, TILDE_JA } from '../constants';

describe('keyInIterableMatches', () => {
  const list = fromJS([{ obj: 'one' }, { obj: 'two', come_on: 'fhqhwqgads' }]);
  const key = 'come_on';
  const target = 'fhqhwqgads';
  it('returns true if item exists', () => {
    expect(utils.keyInIterableMatches(list, key, target)).toBe(true);
  });
  it("returns false if target doesn't exist", () => {
    expect(utils.keyInIterableMatches(list, key, target)).toBe(true);
  });
  it('returns false if list is empty', () => {
    expect(utils.keyInIterableMatches([], key, target)).toBe(false);
  });
  it("returns false if key doesn't exist", () => {
    expect(utils.keyInIterableMatches(list, 'everybody_to_the_limit', target)).toBe(false);
  });
  it("returns false if target isn't present at key", () => {
    expect(utils.keyInIterableMatches(list, key, 'come_on_fhqhwqgads')).toBe(false);
  });
});

describe('keysInListMatch', () => {
  const list = fromJS([{ kana: 'foo' }, { character: 'bar' }]);
  let keys = ['kana', 'character'];
  let target = 'bar';
  it('returns true if item exists in one of the keys', () => {
    expect(utils.keysInListMatch(list, keys, target)).toBe(true);
  });
  it('returns false if item does not exist in one of the keys', () => {
    target = 'qux';
    expect(utils.keysInListMatch(list, keys, target)).toBe(false);
    target = 'bar';
    keys = ['fuz', 'jag'];
    expect(utils.keysInListMatch(list, keys, target)).toBe(false);
  });
});

describe('endsWith', () => {
  it('works as intended', () => {
    expect(utils.endsWith('superduper', 'duper')).toBe(true);
    expect(utils.endsWith('superduper', 'super')).toBe(false);
    expect(utils.endsWith('superduper', 'r')).toBe(true);
    expect(utils.endsWith('superduper', 's')).toBe(false);
    expect(utils.endsWith(' ', ' ')).toBe(true);
    expect(utils.endsWith(' ', '')).toBe(false);
    expect(utils.endsWith('', ' ')).toBe(false);
    expect(utils.endsWith('s ', ' ')).toBe(true);
    expect(utils.endsWith('s ', '')).toBe(false);
    expect(utils.endsWith('', 's')).toBe(false);
    expect(utils.endsWith('', '')).toBe(false);
  });
});

describe('startsWith', () => {
  it('works as intended', () => {
    expect(utils.startsWith('superduper', 'super')).toBe(true);
    expect(utils.startsWith('superduper', 'duper')).toBe(false);
    expect(utils.startsWith('superduper', 's')).toBe(true);
    expect(utils.startsWith('superduper', 'r')).toBe(false);
    expect(utils.startsWith(' ', ' ')).toBe(true);
    expect(utils.startsWith(' ', '')).toBe(false);
    expect(utils.startsWith('', ' ')).toBe(false);
    expect(utils.startsWith('s ', 's')).toBe(true);
    expect(utils.startsWith(' s', 's')).toBe(false);
    expect(utils.startsWith('', 's')).toBe(false);
    expect(utils.startsWith('', '')).toBe(false);
  });
});

describe('fixTerminalN', () => {
  it('modifies final romaji n', () => {
    expect(utils.fixTerminalN('n')).toBe('ん');
    expect(utils.fixTerminalN('wan')).toBe('waん');
    expect(utils.fixTerminalN('wanan')).toBe('wanaん');
    expect(utils.fixTerminalN('わn')).toBe('わん');
  });
  it('passes through input without final romaji n', () => {
    expect(utils.fixTerminalN('')).toBe('');
    expect(utils.fixTerminalN('wa')).toBe('wa');
    expect(utils.fixTerminalN('わ')).toBe('わ');
    expect(utils.fixTerminalN('waん')).toBe('waん');
    expect(utils.fixTerminalN('わん')).toBe('わん');
    expect(utils.fixTerminalN('wana')).toBe('wana');
  });
});

describe('answersContainTilde', () => {
  it('determines if starting tilde is present', () =>
    expect(utils.answersContainTilde([{ character: '犬' }, { character: '〜回' }])).toBe(true),
    expect(utils.answersContainTilde([{ character: '犬' }, { character: '回' }])).toBe(false),
  );
});

describe('fixStartingTilde', () => {
  it('replaces romaji tilde with japanese tilde on strings', () => {
    expect(utils.fixStartingTilde(`${TILDE_EN}わん`)).toBe(`${TILDE_JA}わん`);
  });
  it('adds japanese tilde to strings that do not already start with it', () => {
    expect(utils.fixStartingTilde('わん')).toBe(`${TILDE_JA}わん`);
  });
  it('passes through strings that already start with japanese tilde', () => {
    expect(utils.fixStartingTilde(`${TILDE_JA}わん`)).toBe(`${TILDE_JA}わん`);
  });
});
