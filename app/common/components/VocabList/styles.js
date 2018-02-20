import { injectGlobal } from "styled-components";

import { borderRadius } from "common/styles/sizing";
import { white, grey } from "common/styles/colors";
import { epsilon } from "common/styles/typography";
import { resetList } from "common/styles/utils";

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
    color: ${white[5]};
  }

  .vocab-tip li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      flex: 0 1 auto;
      padding: .2em;
      text-transform: capitalize;
    }

    /* left column category "JA", "RC" etc */
    span:first-child {
      color: ${grey[5]};
      margin-right: .2em;
    }
  }
`;
