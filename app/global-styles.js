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
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: rgb(${blackLight});
    line-height: 1.4;
    ${epsilon}
  }

  body.fontLoaded {
    font-family: ${ffBody};
  }

  [lang=ja] {
    font-family: ${ffJapanese};
    word-break: break-word;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  *:not(input):focus {
    outline: dashed 1px rgba(64, 64, 64, 0.3);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    color: rgb(${greyDark});
    line-height: 1.2;
  }

  small {
    ${milli}
  }

`;
