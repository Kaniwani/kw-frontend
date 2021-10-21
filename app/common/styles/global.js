import { createGlobalStyle } from 'styled-components';

import { black, white, grey } from 'common/styles/colors';
import { ffBody, ffHeading, ffJapanese, epsilon, milli } from 'common/styles/typography';
import { fontface } from 'common/styles/fonts';
import { borderRadius } from 'common/styles/sizing';
import { resetList } from 'common/styles/utils';

const GlobalStyle = createGlobalStyle`
  ${fontface.ubuntu}
  ${fontface.nunitoSans}

  html {
    box-sizing: border-box;
    height: 100%;
    max-width: 100vw;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    ${epsilon}
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: ${ffBody};
    color: ${black[4]};
    background-color: ${white[2]};
    line-height: 1;
    display: flex;
    flex-direction: column;
  }

  [lang="ja"],
  p[lang="ja"],
  span[lang="ja"] {
    font-family: ${ffJapanese} !important;
    word-break: break-word;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  #app {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
    height: 100%;
  }

  *:focus {
    outline: none;
  }

  /* inputs already have fancy focus states */
  .user-is-tabbing :not(input):focus {
    z-index: 10;
    opacity: 1;
    transition: outline 0s;
    outline: .15rem solid;
    outline-offset: .15rem;
  }
  /* force search inputs of search type to have white background (Safari iOS) */
  input[type="search"] {
    background-color: white;
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

  .vocab-tip.vocab-tip {
    ${epsilon}
    padding: .4em .6em .5em;
    border-radius: ${borderRadius};
  }

  .vocab-tip.vocab-tip ul {
    ${resetList}
    color: ${white[5]};
  }

  .vocab-tip.vocab-tip li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vocab-tip.vocab-tip li span {
    flex: 0 1 auto;
    padding: .2em;
    text-transform: capitalize;
  }

  /* left column category "JA", "RC" etc */
  .vocab-tip.vocab-tip li span:first-child {
    color: ${grey[5]};
    margin-right: .2em;
  }
`;

export default GlobalStyle;
