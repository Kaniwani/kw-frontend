import { injectGlobal } from 'styled-components';
import { blackLight, greyDark, purpleLight } from 'shared/styles/colors';
import { media } from 'shared/styles/media';
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
    height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${ffBody};
    color: ${blackLight};
    line-height: 1;
    ${epsilon}
  }

  /* intentional specificity otherwise any <P> components get 1.4 line height*/
  [lang=ja],
  p[lang=ja],
  span[lang=ja] {
    font-family: ${ffJapanese};
    word-break: break-word;
    line-height: 1.18;
  }
  p[lang=ja] {
    letter-spacing: 0.01em;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  *:focus {
    outline: none;
    ${media('min').sm`
      outline: ${purpleLight} auto 3px;
    `}
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    color: ${greyDark};
    line-height: 1.2;
  }

  p {
    line-height: 1.3;
  }

  small {
    ${milli}
  }

`;
