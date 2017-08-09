import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

import { Form as VocabEntryNotes } from 'components/VocabEntryNotes/styles';
import StreakStatus from './StreakStatus';
import Status from './Status';
import CriticalStatus from './CriticalStatus';
import ReviewStatus from './ReviewStatus';
import QuizStatus from './QuizStatus';

export const Wrapper = styled.div`
  ${gutter()};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  & > ${VocabEntryNotes} {
    flex: 1 0 100%;
  }
`;

export const Text = styled.span`
  ${gutter()};
`;
