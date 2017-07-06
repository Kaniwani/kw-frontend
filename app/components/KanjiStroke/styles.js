import styled from 'styled-components';
import IconButton from 'components/IconButton';

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
`;

export const ControlButton = styled(IconButton)`
  padding-left: 1rem;
  padding-right: 1rem;
`;
