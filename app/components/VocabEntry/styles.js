import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

import { Ul as Readings } from 'components/VocabEntryReadings/styles';
import { Wrapper as MeaningHeader } from 'components/VocabEntryMeanings/styles';
import { Ul as VocabLinks } from 'components/VocabEntryLinks/styles';

export const Wrapper = styled.div`
  & ${Readings} {
    display: flex;
    flex-flow: row wrap;
    & > * {
      ${gutter()}
    }
  }

  & ${VocabLinks} {
    flex: 0 1 auto;
  }
`;

export const MeaningsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-content: center;
  & ${MeaningHeader} {
    ${gutter({ type: 'outer', prop: 'margin', position: 'right' })}
  }
`;

export const SynonymsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  & > * {
    ${gutter()}
  }
`;
