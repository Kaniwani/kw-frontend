import styled from 'styled-components';
import P from 'base/P';
import { elementGutter } from 'shared/styles/sizing';
import { greyDark } from 'shared/styles/colors';

export const Reading = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

export const Character = styled(P)`
  ${elementGutter}
  text-align: center;
  flex: 0 1 100%;
  margin: 0 1rem;
  font-size: 2.6em;
`;

export const Kana = styled(Character)`
  font-size: 1.5em;
  margin-top: 0; /* overwrite <P> style */
  color: ${greyDark};
`;
