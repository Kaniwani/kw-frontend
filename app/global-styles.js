import { injectGlobal } from 'styled-components';
import { blackLight, greyDark } from 'shared/styles/colors';
import {
  ffBody,
  ffHeading,
  ffJapanese,
  epsilon,
  milli,
} from 'shared/styles/typography';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: ${blackLight};
    line-height: 1.4;
    ${epsilon}
  }

  body.fontLoaded {
    font-family: ${ffBody};
  }

  /* intentional specificity otherwise any <P> components get 1.4 line height*/
  [lang=ja],
  p[lang=ja],
  span[lang=ja] {
    font-family: ${ffJapanese};
    word-break: break-word;
    line-height: 1.18;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  *:focus {
    outline: #c8c8c8 auto 3px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    color: ${greyDark};
    line-height: 1.2;
  }

  small {
    ${milli}
  }

`;
