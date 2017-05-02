import styled from 'styled-components';
import { transparentize } from 'polished';

import P from 'base/P';

import { transparent, greyDark, purpleLight } from 'shared/styles/colors';
import { elementGutter } from 'shared/styles/sizing';

export const Sentence = styled(P)`
  ${elementGutter}
  line-height: 1;
  color: ${greyDark};

  &[lang="ja"] {
    font-size: 1.5em;
  }

  &:not([lang="ja"]) {
    font-size: 1.1em;
    font-style: italic;
  }
`;

export const VocabMark = styled.mark`
  background-color: ${transparent};
  color: ${transparentize(0.2, purpleLight)};
`;
