import styled from 'styled-components';
import { media } from 'shared/styles/media';

const InfoRow = styled.div`
  flex: 1 0 100%;
  ${media('min').sm` flex: 1 0 50%; `};
  background-color: transparent;
`;

export default InfoRow;
