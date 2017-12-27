import styled from 'styled-components';
import { resetList } from 'common/styles/utils';
import { gutter } from 'common/styles/layout';

const Ul = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  ${({ plainList }) => plainList && resetList}
  ${({ plainList }) => plainList ? gutter() : gutter({ position: 'vertical' })}
`;

export default Ul;
