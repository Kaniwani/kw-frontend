import styled from 'styled-components';
import { resetList } from 'shared/styles/utils';

const Ul = styled.ul`
  ${({ plainList }) => plainList && resetList}
`;

export default Ul;
