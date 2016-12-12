import styled from 'styled-components';
import { setLeftRight } from 'shared/styles/utils';
import { media } from 'shared/styles/media';
import Button from './Button';

const InfoButton = styled(Button)`
  border-bottom-width: ${setLeftRight(0, 1, 0)}px;
  ${media('min').sm`
    border-left-width: ${setLeftRight(0, 0, 0)}px;
    border-right-width: ${setLeftRight(1, 0, 0)}px;
  `}
`;

export default InfoButton;
