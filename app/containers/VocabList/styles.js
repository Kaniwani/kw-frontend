import styled, { css, injectGlobal } from "styled-components";

import { gutter } from "shared/styles/layout";
import { borderRadius } from "shared/styles/sizing";
import { white, grey } from "shared/styles/colors";
import { epsilon } from "shared/styles/typography";
import { resetList } from "shared/styles/utils";

export const Ul = styled.ul`
  ${resetList} ${gutter()} ${({ isExpanded }) =>
  isExpanded &&
      css`
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: stretch;
        align-content: center;
      `};
`;

/* eslint no-unused-expressions: 0 */
injectGlobal`
  /* VocabChip tooltip styles */
  .vocab-tip.vocab-tip {
    ${epsilon}
    padding: .4em .6em .5em;
    border-radius: ${borderRadius};
  }

  .vocab-tip ul {
    ${resetList}
    color: ${white};
  }

  .vocab-tip li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      flex: 0 1 auto;
      padding: .2em;
    }

    /* left column category "JA", "RC" etc */
    span:first-child {
      font-size: .95em;
      color: ${grey};
      margin-right: .2em;
    }
  }
`;
