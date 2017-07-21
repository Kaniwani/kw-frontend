import styled from 'styled-components';

import { Wrapper as VocabEntryLock } from 'components/VocabEntryLock/styles';
import H1 from 'base/H1';

import { gutter } from 'shared/styles/layout';
import { epsilon } from 'shared/styles/typography';

export const Primary = styled(H1)``;

export const Wrapper = styled.div`
  ${gutter()}
  text-transform: capitalize;

  & ${Primary} {
    display: flex;
  }

  & ${VocabEntryLock} {
    ${gutter({ type: 'outer', position: 'left', mod: 4 })}
    ${epsilon}
    font-weight: 400;
    align-self: flex-end;
  }
`;
