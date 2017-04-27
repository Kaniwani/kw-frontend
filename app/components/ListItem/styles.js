import styled from 'styled-components';
import { greyLight } from 'shared/styles/colors';

export const Li = styled.li`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  border-top: 1px solid ${greyLight};

  &:first-child {
    border-top: none;
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
`;
