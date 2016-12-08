import { injectGlobal } from 'styled-components';
import { blackLight, blueLight, blueDark, greyDark } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';
import {
  ffBody,
  ffHeading,
  ffJapanese,
} from 'shared/styles/fonts';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    ${fluidType(14, 18, 400, 1400)}
    line-height: 1.4;
    color: ${blackLight};
  }

  body.fontLoaded {
    font-family: ${ffBody};
  }

  [lang=ja] {
    font-family: ${ffJapanese};
    word-break: keep-all;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    line-height: 1.4;
    color: ${greyDark};
    margin: 0;
    margin-bottom: unit-xs;
    line-height: 1.4;

    &:first-child {
      margin-top: .5em;
    }
  }

  h1 { ${fluidType(22, 36)} }
  h2 { ${fluidType(20, 30)} }
  h3 { ${fluidType(18, 26)} }
  h4 { ${fluidType(17, 22)} }
  h5 { ${fluidType(16, 21)} }
  h6 { ${fluidType(16, 19)} }

${''/*
  *:focus {
    outline: none;
  }
*/}

  b,
  strong {
    font-family: ${ffHeading};
  }

  a {
    text-decoration: none;
    transition: all .3s ease-out;
    color: ${greyDark};
  }

  p + p:last-child {
    margin-bottom: 0;
  }

  p {
    ${fluidType(14, 18, 400, 1400)}
    margin-top: 0;
    margin-bottom: .7em;
  }

  p > a {
    color: ${blueLight};
    &:hover {
      color: ${blueDark};
    }
  }

`;
