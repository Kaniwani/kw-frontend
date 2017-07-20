import styled from 'styled-components';
import { rgba } from 'polished';

import { Ul as Readings, Li, ReadingContent } from 'components/VocabEntryReadings/styles';
import { Wrapper as Reading } from 'components/Reading/styles';

import { whiteLight, greyLight } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  z-index: 2; /* Stay above absolute Quiz Background Image */
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 100%;
`;

export const PanelsWrapper = styled.div`
  background-color: ${whiteLight};
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 2000px;
  display: flex;
  justify-content: center;
  flex: 1 0 100%;
`;

export const PanelWrapper = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  flex: 0 1 800px;

  &:not(:first-of-type) {
    border-top: 2px dashed ${rgba(greyLight, 0.3)};
  }

  &:last-of-type {
    ${gutter({ type: 'outer', position: 'bottom', mod: 3 })}
  }

  & ${Readings} {
    text-align: center;

    & ${Li} {
      align-items: center;
      &:not(:first-of-type) {
        ${gutter({ prop: 'margin', position: 'top' })}
        ${gutter({ prop: 'padding', position: 'top', mod: 1.5 })}
        border-top: 2px dashed ${rgba(greyLight, 0.3)};
      }
    }

    & ${ReadingContent} {
      align-items: center;
    }

    & ${Reading} {
      align-items: center;
    }
  }
`;
