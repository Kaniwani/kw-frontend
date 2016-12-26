import { injectGlobal } from 'styled-components';
import { blackLight, greyDark } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';
import {
  ffBody,
  ffHeading,
  ffJapanese,
} from 'shared/styles/fonts';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    ${fluidType()}
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
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: rgb(${blackLight});
  }

  body.fontLoaded {
    font-family: ${ffBody};
  }

  [lang=ja] {
    font-family: ${ffJapanese};
    word-break: break-word;
  }

  #app {
    min-height: 100vh;
    min-width: 100vw;
  }

  *:not(input):focus {
    outline: dashed 1px rgba(64, 64, 64, 0.3);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    margin-bottom: .2em;
    color: rgb(${greyDark});
    line-height: 1.2;
  }

`;
