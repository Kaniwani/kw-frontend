import styled, { css } from 'styled-components';
import { rgba } from 'polished';

// FIXME: apply these nested styles in their newly extracted QuizInfo components
import { Ul as ReadingsUl, Li, ReadingContent } from 'components/QuizInfoReadings/styles';
import { Wrapper as StrokeLoader } from 'components/KanjiStrokeLoader/styles';
import {
  Wrapper as SynonymsWrapper,
  Ul as Synonyms,
} from 'components/QuizInfoSynonyms/styles';
import { Wrapper as Reading } from 'components/Reading/styles';
import { Wrapper as SentenceWrapper } from 'components/SentencePair/styles';

import { whiteLight, greyLight } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  z-index: 2; /* Stay above absolute Quiz Background Image */
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 100%;
`;

export const PanelsWrapper = styled.div`
  ${gutter({ prop: 'margin', position: 'horizontal' })} ${gutter({
  prop: 'margin',
  position: 'bottom',
})} display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  max-width: 2000px;
  background-color: ${whiteLight};
  flex: 1 1 100%;
  ${({ isMinimized }) => isMinimized && 'flex: 0 1 0px'};
`;

const dashedBottomBorder = css`
  ${gutter({ prop: 'margin', position: 'bottom', mod: 1.5 })} ${gutter({
  prop: 'padding',
  position: 'bottom',
  mod: 2,
})} border-bottom: 2px dashed ${rgba(greyLight, 0.3)};
`;

const dashedTopBorder = css`
  ${gutter({ prop: 'margin', position: 'top', mod: 1.5 })} ${gutter({
  prop: 'padding',
  position: 'top',
  mod: 2,
})} border-top: 2px dashed ${rgba(greyLight, 0.3)};
`;

export const PanelWrapper = styled.div`
  ${gutter()} display: flex;
  flex-flow: row wrap;
  height: 100%;
  justify-content: center;
  flex: 0 1 800px;

  &:last-of-type {
    ${gutter({ type: 'outer', position: 'bottom', mod: 2 })};
  }
`;

export const LockWrapper = styled.div`
  align-self: center;
  ${gutter({ prop: 'margin', position: 'top', mod: 4 })};
`;

export const QuizInfoWrapper = PanelWrapper.extend`
  flex-flow: column nowrap;
  align-content: center;
  & ${SynonymsWrapper} {
    ${dashedTopBorder};
  }

  & ${SentenceWrapper} {
    align-items: center;
    justify-content: center;
  }

  & ${Synonyms} {
    justify-content: center;
  }

  & ${StrokeLoader} {
    align-self: center;
  }

  & ${ReadingsUl} {
    text-align: center;

    & ${Li} {
      align-items: center;
    }

    ${({ detailLevel }) =>
    detailLevel > 1 &&
      css`
        & ${Li}:not(:last-child) {
          ${dashedBottomBorder};
        }
      `};
  }

  & ${ReadingContent} {
    align-items: center;
  }

  & ${Reading} {
    align-items: center;
  }
`;
