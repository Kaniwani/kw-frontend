import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

import { Ul as Readings } from 'components/VocabEntryReadings/styles';

export const Wrapper = styled.div`
  & ${Readings} {
    display: flex;
    flex-flow: row wrap;
    & > * {
      ${gutter()}
    }
  }
`;
