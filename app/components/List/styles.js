import styled from 'styled-components';
import { resetList } from 'shared/styles/utils';

export const Ul = styled.ul`
  ${resetList}
  ${({ cssStyle }) => cssStyle && cssStyle}
`;
