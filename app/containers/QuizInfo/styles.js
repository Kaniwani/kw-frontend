import styled from 'styled-components';
import { transparentize } from 'polished';

import { Ul as Readings, Li, ReadingContent } from 'components/VocabEntryReadings/styles';
import { Wrapper as Reading } from 'components/Reading/styles';

import { whiteLight, greyDark } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';

export const Wrapper = styled.div`
  z-index: 2; /* Stay above absolute Quiz Background Image */
`;

export const PanelsWrapper = Wrapper.extend`
  background-color: ${whiteLight};
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 2000px;
  display: flex;
  justify-content: center;
`;

export const PanelWrapper = styled.div`
  ${gutter({ position: 'horizontal' })}
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 800px;

  &:not(:first-of-type) {
    border-top: 2px dashed ${transparentize(0.3, greyDark)};
  }

  &:last-of-type {
    padding-bottom: 2rem;
  }

  & ${Readings} {
    text-align: center;

    & ${Li} {
      align-items: center;
    }

    & ${ReadingContent} {
      align-items: center;
    }

    & ${Reading} {
      align-items: center;
    }
  }
`;
