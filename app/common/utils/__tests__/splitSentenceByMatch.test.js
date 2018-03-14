import splitSentenceByMatch from '../splitSentenceByMatch';

describe('splitSentenceByMatch()', () => {
  it('sane defaults', () => {
    expect(splitSentenceByMatch()).toEqual({ head: '', match: '', tail: '' });
  });

  describe('matches word', () => {
    it('jukugo', () => {
      expect(splitSentenceByMatch({ sentence: '立ち退きの予告を受けた', word: '予告' })).toEqual({
        head: '立ち退きの',
        match: '予告',
        tail: 'を受けた',
      });
    });

    it('trailing okurigana', () => {
      expect(
        splitSentenceByMatch({
          sentence: '絶対にあの三つ編みの女に電話なんてしない方がいいって！',
          word: '三つ編み',
        })
      ).toEqual({
        head: '絶対にあの',
        match: '三つ編み',
        tail: 'の女に電話なんてしない方がいいって！',
      });
    });

    it('leading okurigana', () => {
      expect(splitSentenceByMatch({ sentence: 'お父さんは台所ですか', word: 'お父さん' })).toEqual({
        head: '',
        match: 'お父さん',
        tail: 'は台所ですか',
      });
    });

    it('suffix', () => {
      expect(
        splitSentenceByMatch({ sentence: '胡瓜の浅漬けならありますよ', word: '〜漬け' })
      ).toEqual({
        head: '胡瓜の浅',
        match: '漬け',
        tail: 'ならありますよ',
      });
    });

    it('prefix', () => {
      expect(
        splitSentenceByMatch({ sentence: 'バイクが猛スピードで突っ込んできた', word: '猛〜' })
      ).toEqual({
        head: 'バイクが',
        match: '猛',
        tail: 'スピードで突っ込んできた',
      });
    });

    it('matches word before reading', () => {
      expect(
        splitSentenceByMatch({
          sentence: '「われわれはジュゴンにも藻場にも関心はない」と彼は政府を批判した',
          word: '藻',
          reading: 'も',
        })
      ).toEqual({
        head: '「われわれはジュゴンにも',
        match: '藻',
        tail: '場にも関心はない」と彼は政府を批判した',
      });
    });

    it('matches word before reading when stripping okurigana', () => {
      expect(
        splitSentenceByMatch({
          sentence: '自民党が人気の尻馬に乗った',
          word: '乗る',
          reading: 'のる',
        })
      ).toEqual({
        head: '自民党が人気の尻馬に',
        match: '乗',
        tail: 'った',
      });
    });

    it('differing trailing okurigana conjugation', () => {
      expect(
        splitSentenceByMatch({ sentence: '私は小銭を探したが見当たらない', word: '見当たる' })
      ).toEqual({
        head: '私は小銭を探したが',
        match: '見当',
        tail: 'たらない',
      });
    });

    it('differing trailing okurigana conjugation', () => {
      expect(
        splitSentenceByMatch({ sentence: '彼の話は一言も聞き逃さなかった', word: '逃す' })
      ).toEqual({
        head: '彼の話は一言も聞き',
        match: '逃',
        tail: 'さなかった',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: 'このお守りを肌身離さず身に着けると約束してくれないか？',
          word: '着ける',
          reading: 'つける',
          verbType: 'v1',
        })
      ).toEqual({
        head: 'このお守りを肌身離さず身に',
        match: '着ける',
        tail: 'と約束してくれないか？',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '名声を求めるな',
          word: '求める',
          reading: 'もとめる',
          verbType: 'v1',
        })
      ).toEqual({
        head: '名声を',
        match: '求める',
        tail: 'な',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '要求は認められた',
          word: '認める',
          reading: 'みとめる',
          verbType: 'v1',
        })
      ).toEqual({
        head: '要求は',
        match: '認められた',
        tail: '',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '彼の話は一言も聞き逃さなかった',
          word: '逃す',
          reading: 'のがす',
          verbType: 'v5',
        })
      ).toEqual({
        head: '彼の話は一言も聞き',
        match: '逃さなかった',
        tail: '',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '私はその映画を見逃してしまった',
          word: '見逃す',
          reading: 'みのがす',
          verbType: 'v5',
        })
      ).toEqual({
        head: '私はその映画を',
        match: '見逃して',
        tail: 'しまった',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          word: '作る',
          reading: 'つくる',
          sentence: 'データ化して壁紙も作ってある',
          verbType: 'v5r',
        })
      ).toEqual({
        head: 'データ化して壁紙も',
        match: '作ってある',
        tail: '',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          word: '払い戻す',
          reading: 'はらいもどす',
          sentence: '払い戻してください',
          verbType: 'v5s',
        })
      ).toEqual({
        head: '',
        match: '払い戻してください',
        tail: '',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '同窓会の日取りを決めた',
          word: '決める',
          reading: 'きめる',
          verbType: 'v1',
        })
      ).toEqual({
        head: '同窓会の日取りを',
        match: '決めた',
        tail: '',
      });
    });

    it('attempts various conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '手を動かさないで',
          word: '動かす',
          reading: 'うごかす',
          verbType: 'v5s',
        })
      ).toEqual({
        head: '手を',
        match: '動かさないで',
        tail: '',
      });
    });
  });

  describe('matches reading', () => {
    it('hiragana', () => {
      expect(
        splitSentenceByMatch({ sentence: 'すいか買った', word: '西瓜', reading: 'すいか' })
      ).toEqual({
        head: '',
        match: 'すいか',
        tail: '買った',
      });
    });

    it('katakana', () => {
      expect(
        splitSentenceByMatch({
          sentence: '言い換えれば磁石の磁場はハトの頭にある',
          word: 'はと',
          reading: 'ハト',
        })
      ).toEqual({
        head: '言い換えれば磁石の磁場は',
        match: 'ハト',
        tail: 'の頭にある',
      });
    });

    it('attempts various hiragana conjugations with verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '彼の話は一言も聞きのがさなかった',
          word: '逃す',
          reading: 'のがす',
          verbType: 'v5s',
        })
      ).toEqual({
        head: '彼の話は一言も聞き',
        match: 'のがさなかった',
        tail: '',
      });
    });

    it('differing trailing okurigana conjugation partial match without verbType', () => {
      expect(
        splitSentenceByMatch({
          sentence: '彼の話は一言も聞きのがさなかった',
          word: '逃す',
          reading: 'のがす',
        })
      ).toEqual({
        head: '彼の話は一言も聞き',
        match: 'のが',
        tail: 'さなかった',
      });
    });
  });
});
