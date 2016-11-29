import microtime from 'microtime';
import testTable from './transliteration-table';
import {
  defaultOptions,
  isKana,
  isKatakana,
  isHiragana,
  isRomaji,
  isMixed,
  toKana,
  toKatakana,
  toHiragana,
  toRomaji,
} from '../core';

/* eslint-disable no-undef */
// since { describe, it, test, expect } etc aren't explicitly imported from jest

describe('Character type detection', () => {
  describe('isHiragana()', () => {
    it('あ is hiragana', () => expect(isHiragana('あ')).toBe(true));
    it('ああ is hiragana', () => expect(isHiragana('ああ')).toBe(true));
    it('ア is not hiragana', () => expect(isHiragana('ア')).toBe(false));
    it('A is not hiragana', () => expect(isHiragana('A')).toBe(false));
    it('あア is not hiragana', () => expect(isHiragana('あア')).toBe(false));
    it('ignores long dash in hiragana', () => expect(isHiragana('げーむ')).toBe(true));
  });

  describe('isKatakana()', () => {
    it('アア is katakana', () => expect(isKatakana('アア')).toBe(true));
    it('ア is katakana', () => expect(isKatakana('ア')).toBe(true));
    it('あ is not katakana', () => expect(isKatakana('あ')).toBe(false));
    it('A is not katakana', () => expect(isKatakana('A')).toBe(false));
    it('あア is not katakana', () => expect(isKatakana('あア')).toBe(false));
    it('ignores long dash in katakana', () => expect(isKatakana('ゲーム')).toBe(true));
  });

  describe('isKana()', () => {
    it('あ is kana', () => expect(isKana('あ')).toBe(true));
    it('ア is kana', () => expect(isKana('ア')).toBe(true));
    it('あア is kana', () => expect(isKana('あア')).toBe(true));
    it('A is not kana', () => expect(isKana('A')).toBe(false));
    it('あAア is not kana', () => expect(isKana('あAア')).toBe(false));
    it('ignores long dash in mixed kana', () => expect(isKana('アーあ')).toBe(true));
  });

  describe('isRomaji()', () => {
    it('A is romaji', () => expect(isRomaji('A')).toBe(true));
    it('ABC is romaji', () => expect(isRomaji('ABC')).toBe(true));
    it('xYz is romaji', () => expect(isRomaji('xYz')).toBe(true));
    it('あ is not romaji', () => expect(isRomaji('あ')).toBe(false));
    it('ア is not romaji', () => expect(isRomaji('ア')).toBe(false));
    it('あア is not romaji', () => expect(isRomaji('あア')).toBe(false));
    it('Aア is not romaji', () => expect(isRomaji('Aア')).toBe(false));
    it('passes roman punctuation', () => expect(isRomaji('a*b&c-d')).toBe(true));
  });

  describe('isMixed()', () => {
    it('Aア is mixed', () => expect(isMixed('Aア')).toBe(true));
    it('Aあ is mixed', () => expect(isMixed('Aあ')).toBe(true));
    it('あア is not mixed', () => expect(isMixed('あア')).toBe(false));
    it('A is not mixed', () => expect(isMixed('A')).toBe(false));
    it('あ is not mixed', () => expect(isMixed('あ')).toBe(false));
    it('ア is not mixed', () => expect(isMixed('ア')).toBe(false));
  });
});

describe('Character conversion', () => {
  describe('Quick Brown Fox - Romaji to Hiragana', () => {
    // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
    const options = {
      useObsoleteKana: true,
    };
    expect(toHiragana('IROHANIHOHETO', options)).toBe('いろはにほへと'); // Even the colorful fragrant flowers'
    expect(toHiragana('CHIRINURUWO', options)).toBe('ちりぬるを'); // die sooner or later.'
    expect(toHiragana('WAKAYOTARESO', options)).toBe('わかよたれそ'); // Us who live in this world'
    expect(toHiragana('TSUNENARAMU', options)).toBe('つねならむ'); // cannot live forever, either.'
    expect(toHiragana('UWINOOKUYAMA', options)).toBe('うゐのおくやま'); // This transient mountain with shifts and changes,'
    expect(toHiragana('KEFUKOETE', options)).toBe('けふこえて'); // today we are going to overcome, and reach the world of enlightenment.'
    expect(toHiragana('ASAKIYUMEMISHI', options)).toBe('あさきゆめみし'); // We are not going to have meaningless dreams'
    expect(toHiragana('WEHIMOSESUN', options)).toBe('ゑひもせすん'); // nor become intoxicated with the fake world anymore.'
  });

  describe('Test every character with toHiragana() and toKatakana()', () => {
    testTable.forEach((item) => {
      const [romaji,
        hiragana,
        katakana] = item;
      expect(toHiragana(romaji)).toBe(hiragana);
      expect(toKatakana(romaji.toUpperCase())).toBe(katakana);
    });
  });

  describe('Double consonants transliterate to glottal stops (small tsu)', () => {
    it('double B', () => expect(toHiragana('babba')).toBe('ばっば'));
    it('double C', () => expect(toHiragana('cacca')).toBe('かっか'));
    it('double Ch', () => expect(toHiragana('chaccha')).toBe('ちゃっちゃ'));
    it('double D', () => expect(toHiragana('dadda')).toBe('だっだ'));
    it('double F', () => expect(toHiragana('fuffu')).toBe('ふっふ'));
    it('double G', () => expect(toHiragana('gagga')).toBe('がっが'));
    it('double H', () => expect(toHiragana('hahha')).toBe('はっは'));
    it('double J', () => expect(toHiragana('jajja')).toBe('じゃっじゃ'));
    it('double K', () => expect(toHiragana('kakka')).toBe('かっか'));
    it('double L', () => expect(toHiragana('lalla')).toBe('らっら'));
    it('double M', () => expect(toHiragana('mamma')).toBe('まっま'));
    it('double N', () => expect(toHiragana('nanna')).toBe('なんな'));
    it('double P', () => expect(toHiragana('pappa')).toBe('ぱっぱ'));
    it('double Q', () => expect(toHiragana('qaqqa')).toBe('くぁっくぁ'));
    it('double R', () => expect(toHiragana('rarra')).toBe('らっら'));
    it('double S', () => expect(toHiragana('sassa')).toBe('さっさ'));
    it('double Sh', () => expect(toHiragana('shassha')).toBe('しゃっしゃ'));
    it('double T', () => expect(toHiragana('tatta')).toBe('たった'));
    it('double Ts', () => expect(toHiragana('tsuttsu')).toBe('つっつ'));
    it('double V', () => expect(toHiragana('vavva')).toBe('ゔぁっゔぁ'));
    it('double W', () => expect(toHiragana('wawwa')).toBe('わっわ'));
    it('double X', () => expect(toHiragana('yayya')).toBe('やっや'));
    it('double Z', () => expect(toHiragana('zazza')).toBe('ざっざ'));
  });

  describe('toKana()', () => {
    it('Lowercase characters are transliterated to hiragana.',
      () => expect(toKana('onaji')).toBe(toHiragana('onaji')));

    it('Lowercase with double consonants and double vowels are transliterated to hiragana.',
      () => expect(toKana('buttsuuji')).toBe(toHiragana('ぶっつうじ')));

    it('Uppercase characters are transliterated to katakana.',
      () => expect(toKana('ONAJI')).toBe(toKatakana('onaji')));

    it('Uppercase with double consonants and double vowels are transliterated to katakana.',
      () => expect(toKana('BUTTSUUJI')).toBe(toKatakana('ブッツウジ')));

    it('WaniKani -> ワにカに - Mixed case uses the first character for each syllable.',
      () => expect(toKana('WaniKani')).toBe('ワにカに'));

    it('Non-romaji will be passed through.',
      () => expect(toKana('ワにカに AiUeO 鰐蟹 12345 @#$%')).toBe('ワにカに アいウえオ 鰐蟹 12345 @#$%'));

    it('It handles mixed syllabaries',
      () => expect(toKana('座禅[zazen]スタイル')).toBe('座禅「ざぜん」スタイル'));

    it('Will convert short to long dashes',
      () => expect(toKana('batsuge-mu')).toBe('ばつげーむ'));

    it('Will convert punctuation but pass through spaces',
      () => expect(toKana(' .,[]{}()!?/')).toBe(' 。、「」｛｝（）！？・'));
  });

  describe('Converting kana to kana', () => {
    it('k -> h', () => expect(toHiragana('バケル')).toBe('ばける'));
    it('h -> k', () => expect(toKatakana('ばける')).toBe('バケル'));

    it('It survives only katakana toKatakana', () => expect(toKatakana('スタイル')).toBe('スタイル'));
    it('It survives only hiragana toHiragana', () => expect(toHiragana('すたいる')).toBe('すたいる'));
    it('Mixed kana converts every char k -> h', () => expect(toKatakana('アメリカじん')).toBe('アメリカジン'));
    it('Mixed kana converts every char h -> k', () => expect(toHiragana('アメリカじん')).toBe('あめりかじん'));
    it('Converts long vowels correctly from k -> h', () => expect(toHiragana('バツゴー')).toBe('ばつごう'));
    it('Preserves long dash from h -> k', () => expect(toKatakana('ばつゲーム')).toBe('バツゲーム'));

    describe('Mixed syllabaries', () => {
      it('It passes non-katakana through when passRomaji is true k -> h',
        () => expect(toHiragana('座禅[zazen]スタイル', { passRomaji: true })).toBe('座禅[zazen]すたいる'));

      it('It passes non-hiragana through when passRomaji is true h -> k',
        () => expect(toKatakana('座禅[zazen]すたいる', { passRomaji: true })).toBe('座禅[zazen]スタイル'));

      it('It converts non-katakana when passRomaji is false k -> h',
        () => expect(toHiragana('座禅[zazen]スタイル')).toBe('座禅「ざぜん」すたいる'));

      it('It converts non-hiragana when passRomaji is false h -> k',
        () => expect(toKatakana('座禅[zazen]すたいる')).toBe('座禅「ザゼン」スタイル'));
    });
  });

  describe('Case sensitivity', () => {
    it("cAse DoEsn'T MatTER for toHiragana()", () => expect(toHiragana('aiueo')).toBe(toHiragana('AIUEO')));
    it("cAse DoEsn'T MatTER for toKatakana()", () => expect(toKatakana('aiueo')).toBe(toKatakana('AIUEO')));
    it('Case DOES matter for toKana()', () => expect(toKana('aiueo')).not.toBe(toKana('AIUEO')));
  });

  describe('N edge cases', () => {
    it('Solo N', () => expect(toKana('n')).toBe('ん'));
    it('double N', () => expect(toKana('onn')).toBe('おん'));
    it('N followed by N* syllable', () => expect(toKana('onna')).toBe('おんな'));
    it('Triple N', () => expect(toKana('nnn')).toBe('んん'));
    it('Triple N followed by N* syllable', () => expect(toKana('onnna')).toBe('おんな'));
    it('Quadruple N', () => expect(toKana('nnnn')).toBe('んん'));
    it('nya -> にゃ', () => expect(toKana('nyan')).toBe('にゃん'));
    it('nnya -> んにゃ', () => expect(toKana('nnyann')).toBe('んにゃん'));
    it('nnnya -> んにゃ', () => expect(toKana('nnnyannn')).toBe('んにゃんん'));
    it('Properly add space after "n[space]"', () => expect(toKana('ichiban warui')).toBe('いちばん わるい'));
  });

  describe('Bogus 4 character sequences', () => {
    it('Non bogus sequences work', () => expect(toKana('chya')).toBe('ちゃ'));
    it('Bogus sequences do not work', () => expect(toKana('chyx')).toBe('chyx'));
    it('Bogus sequences do not work', () => expect(toKana('shyp')).toBe('shyp'));
    it('Bogus sequences do not work', () => expect(toKana('ltsb')).toBe('ltsb'));
  });
});

describe('Kana to Romaji', () => {
  describe('toRomaji()', () => {
    it('Convert katakana to romaji. convertKatakanaToUppercase is false by tOt',
     () => expect(toRomaji('ワニカニ　ガ　スゴイ　ダ')).toBe('wanikani ga sugoi da'));

    it('Convert hiragana to romaji',
     () => expect(toRomaji('わにかに　が　すごい　だ')).toBe('wanikani ga sugoi da'));

    it('Convert mixed kana to romaji',
     () => expect(toRomaji('ワニカニ　が　すごい　だ')).toBe('wanikani ga sugoi da'));

    it('Will convert punctuation and full-width spaces',
     () => expect(toRomaji('　。、「」｛｝ー（）！？・')).toBe(' .,[]{}-()!?/'));

    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for katakana.',
     () => expect(toRomaji('ワニカニ', { convertKatakanaToUppercase: true })).toBe('WANIKANI'));

    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for mixed kana.',
     () => expect(toRomaji('ワニカニ　が　すごい　だ', { convertKatakanaToUppercase: true })).toBe('WANIKANI ga sugoi da'));

    it("Doesn't mangle the long dash 'ー' or slashdot '・'",
     () => expect(toRomaji('罰ゲーム・ばつげーむ')).toBe('罰ge-mu/batsuge-mu'));

    it('Spaces must be manually entered',
     () => expect(toRomaji('わにかにがすごいだ')).not.toBe('wanikani ga sugoi da'));

    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for hiragana.',
     () => expect(toRomaji('わにかに', { convertKatakanaToUppercase: true })).toBe('wanikani'));
  });

  describe('Quick Brown Fox - Hiragana to Romaji', () => {
    expect(toRomaji('いろはにほへと')).toBe('irohanihoheto');
    expect(toRomaji('ちりぬるを')).toBe('chirinuruwo');
    expect(toRomaji('わかよたれそ')).toBe('wakayotareso');
    expect(toRomaji('つねならむ')).toBe('tsunenaramu');
    expect(toRomaji('うゐのおくやま')).toBe('uwinookuyama');
    expect(toRomaji('けふこえて')).toBe('kefukoete');
    expect(toRomaji('あさきゆめみし')).toBe('asakiyumemishi');
    expect(toRomaji('ゑひもせすん')).toBe('wehimosesun');
  });

  describe("double n's and double consonants", () => {
    it('Double and single n', () => expect(toRomaji('きんにくまん')).toBe('kinnikuman'));
    it('N extravaganza', () => expect(toRomaji('んんにんにんにゃんやん')).toBe("nnninninnyan'yan"));
    it('Double consonants',
      () => expect(toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chaccha yattsu'));
  });

  describe('Small kana', () => {
    it("Small tsu doesn't transliterate", () => expect(toRomaji('っ')).toBe(''));
    it('Small ya', () => expect(toRomaji('ゃ')).toBe('ya'));
    it('Small yu', () => expect(toRomaji('ゅ')).toBe('yu'));
    it('Small yo', () => expect(toRomaji('ょ')).toBe('yo'));
    it('Small a', () => expect(toRomaji('ぁ')).toBe('a'));
    it('Small i', () => expect(toRomaji('ぃ')).toBe('i'));
    it('Small u', () => expect(toRomaji('ぅ')).toBe('u'));
    it('Small e', () => expect(toRomaji('ぇ')).toBe('e'));
    it('Small o', () => expect(toRomaji('ぉ')).toBe('o'));
    it('Small ke (ka)', () => expect(toRomaji('ヶ')).toBe('ka'));
    it('Small ka', () => expect(toRomaji('ヵ')).toBe('ka'));
    it('Small wa', () => expect(toRomaji('ゎ')).toBe('wa'));
  });
});

describe('Options', () => {
  it('useObsoleteKana', () => {
    const options = { useObsoleteKana: true };
    it('wi = ゐ (when useObsoleteKana is true)', () => expect(toHiragana('wi', options)).toBe('ゐ'));
    it('we = ゑ', () => expect(toHiragana('we', options)).toBe('ゑ'));
    it('WI = ヰ', () => expect(toKatakana('wi', options)).toBe('ヰ'));
    it('WE = ヱ', () => expect(toKatakana('we', options)).toBe('ヱ'));

    options.useObsoleteKana = false;
    it('wi = うぃ when useObsoleteKana is false', () => expect(toHiragana('wi', options)).toBe('うぃ'));
    it('useObsoleteKana is false by default', () => expect(toHiragana('wi')).toBe('うぃ'));
  });

  describe('IMEMode', () => {
    /** Simulate real typing by calling the function on every character in sequence */
    function testTyping(str, opts) {
      let pos = 1;
      let text = str;
      const len = str.length;
      // console.log(`--${str}--`);
      while (pos <= len) {
        let buffer = str.slice(0, pos);
        const rest = str.slice(pos);
        buffer = toKana(buffer, opts);
        // console.log(`${pos}:${buffer} <-${rest}`);
        text = buffer + rest;
        pos += 1;
      }
      return text;
    }

    it("Without IME mode, solo n's are transliterated.", () => expect(toKana('n')).toBe('ん'));
    it("Without IME mode, double n's are transliterated.", () => expect(toKana('nn')).toBe('ん'));

    const options = { IMEMode: true };
    it("With IME mode, solo n's are not transliterated.", () => expect(testTyping('n', options)).toBe('n'));
    it("With IME mode, double n's are transliterated.", () => expect(testTyping('nn', options)).toBe('ん'));
    it('With IME mode, n + space are transliterated.', () => expect(testTyping('n ', options)).toBe('ん'));
    it("With IME mode, n + ' are transliterated.", () => expect(testTyping("n'", options)).toBe('ん'));
    it('With IME mode, ni.', () => expect(testTyping('ni', options)).toBe('に'));

    it('kan', () => expect(testTyping('kan', options)).toBe('かn'));
    it('kanp', () => expect(testTyping('kanp', options)).toBe('かんp'));
    it('kanpai!', () => expect(testTyping('kanpai', options)).toBe('かんぱい'));
    it('nihongo', () => expect(testTyping('nihongo', options)).toBe('にほんご'));

    it("y doesn't count as a consonant for IME", () => expect(testTyping('ny', options)).toBe('ny'));
    it('nya works as expected', () => expect(testTyping('nya', options)).toBe('にゃ'));

    it("With IME mode, solo N's are not transliterated - katakana.", () => expect(testTyping('N', options)).toBe('N'));
    it("With IME mode, double N's are transliterated - katakana.", () => expect(testTyping('NN', options)).toBe('ン'));
    it('With IME mode, NI - katakana.', () => expect(testTyping('NI', options)).toBe('ニ'));
    it('With IME mode - KAN - katakana', () => expect(testTyping('KAN', options)).toBe('カN'));
    it('With IME mode - NIHONGO - katakana', () => expect(testTyping('NIHONGO', options)).toBe('ニホンゴ'));
  });

  describe('Apostrophes for vague consonant vowel combos', () => {
    it("おんよみ = on'yomi", () => expect(toRomaji('おんよみ')).toBe("on'yomi"));
    it('Checking other combinations', () => expect(toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
  });

  describe('Options use defaultOptions by default', () => {
    defaultOptions.useObsoleteKana = true;
    it('Overwrite default (temporarily)', () => expect(toHiragana('wi')).toBe('ゐ'));
    const options = { IMEMode: true };
    it("Defaults aren't overwritten by being omitted", () => expect(toHiragana('wi', options)).toBe('ゐ'));
  });
});

describe('Performance', () => {
  /* eslint-disable no-console */

  describe('romaji toHiragana Speed', () => {
    const startTime = microtime.now();
    toKana('aiueosashisusesonaninunenokakikukeko');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 syllables toKana (hiragana) speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
  describe('romaji toKatakana Speed', () => {
    const startTime = microtime.now();
    toKana('AIUEOSASHISUSESONANINUNENOKAKIKUKEKO');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 syllables toKana (katakana) speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
  describe('hiragana ToRomaji Speed', () => {
    const startTime = microtime.now();
    toRomaji('あいうえおさしすせそなにぬねのかきくけこ');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 hiragana chars toRomaji speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
  describe('katakana ToRomaji Speed', () => {
    const startTime = microtime.now();
    toRomaji('アイウエオサシスセソナニヌネノカキクケコ');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 katakana chars toRomaji speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
});
