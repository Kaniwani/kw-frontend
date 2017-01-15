import * as utils from '../utils';
// import { ReadingRecord } from 'shared/models';
import { TILDE_EN, TILDE_JA } from 'shared/constants';

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
//
// describe('getTildePosition', () => {
//   it('determines if tilde is at start on kana', () =>
//     expect(utils.getTildePosition([
//       new ReadingRecord({ character: '犬' }),
//       new ReadingRecord({ kana: '〜回' }),
//     ])).toBe('start'),
//   );
//   it('determines if tilde is at end on kana', () =>
//     expect(utils.getTildePosition([
//       new ReadingRecord({ character: '犬' }),
//       new ReadingRecord({ kana: '回〜' }),
//     ])).toBe('end'),
//   );
//   it('determines if tilde is at end on character', () =>
//     expect(utils.getTildePosition([
//       new ReadingRecord({ character: '犬〜' }),
//       new ReadingRecord({ kana: '回' }),
//     ])).toBe('end'),
//   );
//   it('determines if tilde is at start on chracter', () =>
//     expect(utils.getTildePosition([
//       new ReadingRecord({ character: '〜犬' }),
//       new ReadingRecord({ kana: '回' }),
//     ])).toBe('start'),
//   );
//   it('returns false if tilde is not present', () =>
//     expect(utils.getTildePosition([
//       new ReadingRecord({ character: '犬' }),
//       new ReadingRecord({ kana: '回' }),
//     ])).toBe(false),
//   );
// });

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

describe('fixEndingTilde', () => {
  it('replaces romaji tilde with japanese tilde on strings', () => {
    expect(utils.fixEndingTilde(`わん${TILDE_EN}`)).toBe(`わん${TILDE_JA}`);
  });
  it('adds japanese tilde to strings that do not already end with it', () => {
    expect(utils.fixEndingTilde('わん')).toBe(`わん${TILDE_JA}`);
  });
  it('passes through strings that already ends with japanese tilde', () => {
    expect(utils.fixEndingTilde(`わん${TILDE_JA}`)).toBe(`わん${TILDE_JA}`);
  });
});
