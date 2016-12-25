import { injectGlobal } from 'styled-components';
import { blackLight, blueLight, blueDark, greyDark } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';
import { unit } from 'shared/styles/sizing';
import {
  ffBody,
  ffHeading,
  ffJapanese,
} from 'shared/styles/fonts';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
    ${fluidType(14, 20, 400, 1400)}
    line-height: 1.4;
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
    min-height: 100%;
    min-width: 100%;
  }

  *:not(input):focus {
    outline: dashed 1px rgba(64, 64, 64, 0.3);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    margin-bottom: ${unit.xs};
    color: rgb(${greyDark});
    line-height: 1.4;
  }

  h1 { ${fluidType(22, 36)} }
  h2 { ${fluidType(20, 30)} }
  h3 { ${fluidType(18, 24)} }
  h4 { ${fluidType(17, 22)} }
  h5 { ${fluidType(16, 21)} }
  h6 { ${fluidType(16, 19)} }

  b,
  strong {
    font-family: ${ffHeading};
  }

  a {
    text-decoration: none;
    transition: all .3s ease-out;
    color: rgb(${greyDark});
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
    color: rgb(${blueLight});
    &:hover {
      color: rgb(${blueDark});
    }
  }

`;
