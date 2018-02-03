import { inflect } from '../conjugate';

const fixtures = [
  { type: 'v5u', word: '使う', desc: '-う -u' },
  { type: 'v5k', word: '焼く', desc: '-く -ku' },
  { type: 'v5g', word: '泳ぐ', desc: '-ぐ -gu' },
  { type: 'v5s', word: '示す', desc: '-す -su' },
  { type: 'v5t', word: '待つ', desc: '-つ -tsu' },
  { type: 'v5m', word: '読む', desc: '-む -mu' },
  { type: 'v5b', word: '呼ぶ', desc: '-ぶ -bu' },
  { type: 'v5n', word: '死ぬ', desc: '-ぬ -nu' },
  { type: 'v5r', word: '走る', desc: '-る -ru' },
  { type: 'v1', word: '食べる', desc: '-る -ru' },
];

describe('conjugate', () => {
  it('inflect defaults to v5', () => {
    expect(inflect('帰る')).toMatchSnapshot();
  });

  fixtures.forEach(({ type, word, desc }) => {
    it(`inflects ${word} ${type} ${desc}`, () => {
      expect(inflect(word, type)).toMatchSnapshot();
    });
  });
});
