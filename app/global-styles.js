import { injectGlobal } from 'styled-components';
import { blackLight, whiteLight } from 'shared/styles/colors';

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
    height: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    ${epsilon}
    min-height: 100%;
    margin: 0;
    padding: 0;
    font-family: ${ffBody};
    color: ${blackLight};
    background-color: ${whiteLight};
    line-height: 1;
    display: flex;
    flex-direction: column;
  }

  [lang="ja"],
  p[lang="ja"],
  span[lang="ja"] {
    font-family: ${ffJapanese};
    word-break: break-word;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  #app {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
  }

  *:focus {
    outline: none;
  }

  /* inputs already have fancy focus states */
  .user-is-tabbing :not(input):focus {
    opacity: 1;
    transition: outline 0s;
    outline: .15rem solid;
    outline-offset: .15rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    line-height: 1.2;
  }

  a,
  button {
    cursor: pointer;
  }

  p {
    line-height: 1.3;
    margin: 0;
    + p {
      margin-top: .4em;
    }
  }

  small {
    ${milli}
  }
`;
