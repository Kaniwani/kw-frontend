import styled from 'styled-components';
import { transparentize } from 'polished';
import { transparent, whiteLight, greyDark, purpleLight } from 'shared/styles/colors';
import { containerGutter, elementGutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';

import P from 'base/P';
import Element from 'layouts/Element';

export const ButtonWrap = styled(Element)`
  padding: 1rem;
`;

export const Wrapper = styled.div`
  background-color: ${transparent};
  overflow: hidden;
  width: 100%;
  z-index: 2;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  max-width: 2000px;

  ${media('min').sm`
    margin-bottom: 2rem;
  `}
`;

export const PanelWrapper = styled.div`
  ${containerGutter}
  background-color: ${whiteLight};

  &:not(:first-of-type) {
    border-top: 2px dashed ${transparentize(0.3, greyDark)};
  }

  &:last-of-type {
    ${({ addPadding }) => addPadding ? 'padding-bottom: 2rem;' : ''}
  }

  ${media('min').sm`
    margin-left: .4rem;
    margin-right: .4rem;
    &:first-child {
      border-radius: .3rem .3rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 .3rem .3rem;
    }
    &:only-child {
      border-radius: .3rem;
    }
  `}
`;

export const ReadingPair = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

export const SentencePair = styled.div`
  text-align: center;
`;

export const Reading = styled(P)`
  ${elementGutter}
  text-align: center;
  flex: 0 1 100%;
  margin: 0 1rem;

  &:first-child { /* kanji */
    font-size: 2.6em;
  }

  &:not(:first-child) { /* kana */
    font-size: 1.5em;
    margin-top: 0; /* overwrite <P> style */
    color: ${greyDark};
  }
`;

export const Sentence = styled(P)`
  ${elementGutter}
  line-height: 1;
  text-align: center;
  color: ${greyDark};
  margin: .5em auto 0;

  &:first-child {
    font-size: 1.5em; /* always prefer Japanese chars larger */
  }

  &:not(:first-child) {
    font-size: 1em;
    font-style: italic;
    margin-bottom: .75em;
  }
`;

export const VocabMark = styled.mark`
  background-color: ${transparent};
  color: ${transparentize(0.8, purpleLight)};
`;
