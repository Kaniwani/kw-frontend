import { injectGlobal } from 'styled-components';

const ffBody = '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';
const ffHeading = '"Ubuntu", Helvetica, Arial, sans-serif';
const ffJapanese = '"Hiragino Kaku Gothic Pro", "Takao Pゴシック", "Meiryo", "Yu Gothic", "ヒラギノ角ゴ Pro W3", "メイリオ", "Osaka", "MS PGothic", "ＭＳ Ｐゴシック", sans-serif';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-size: calc(14px + 4 * ((100vw - 400px) / 1000));
    line-height: 1.4;
    color: black-light;
  }

  body.fontLoaded {
    font-family: ${ffBody};
  }

  [lang=ja] {
    font-family: ${ffJapanese};
    word-break: keep-all;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family:${ffHeading};
    font-weight: normal;
    margin: 0;
    line-height: 1.4;
    /*    color: grey-dark;*/
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }
`;
