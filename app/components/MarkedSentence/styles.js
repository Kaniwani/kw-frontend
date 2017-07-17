import styled from 'styled-components';
import { rgba, lighten } from 'polished';

import P from 'base/P';
import Mark from 'base/Mark';

import { gutter } from 'shared/styles/layout';
import { borderRadius } from 'shared/styles/sizing';
import { transparent, greyDark, purpleLight } from 'shared/styles/colors';
import { fastEaseQuad, midEaseQuad } from 'shared/styles/animation';

export const Wrapper = styled.div`
  ${gutter()}
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const Sentence = P.extend`
  line-height: 1;
  color: ${greyDark};

  &[lang="ja"] {
    flex: 1 1 100%;
    font-size: 1.5em;
  }

  &:not([lang="ja"]) {
    flex: 0 1 auto;
    font-size: 1.1em;
    font-style: italic;
    background-color: ${greyDark};
    color: ${lighten(0.06, greyDark)};
    transition: all ${fastEaseQuad};
    border-radius: ${borderRadius};

    &:hover,
    &:active,
    &:focus {
      transition: all ${midEaseQuad};
      outline: none;
      color: greyDark;
      background-color: transparent;
    }
  }
`;

export const VocabMark = styled(Mark)`
  background-color: ${transparent};
  color: ${rgba(purpleLight, 0.8)};
`;
