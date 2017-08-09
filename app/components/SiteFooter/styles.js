import styled from 'styled-components';

import Container from 'base/Container';

import { gutter, centerByPadding } from 'shared/styles/layout';

export const Wrapper = styled(Container)`
  ${gutter({ position: 'vertical', mod: 10 })}
  ${centerByPadding}
  display: flex;
  margin-top: auto;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;
