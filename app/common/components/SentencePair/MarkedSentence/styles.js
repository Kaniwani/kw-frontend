import styled from 'styled-components';
import { rgba } from 'polished';

import P from 'common/components/P';
import Mark from 'common/components/Mark';

import { transparent, grey, purple } from 'common/styles/colors';
import { gamma } from 'common/styles/typography';

export const Sentence = P.extend`
  line-height: 1;
  color: ${grey[7]};
  ${gamma}
`;

export const VocabMark = styled(Mark)`
  background-color: ${transparent};
  color: ${purple[4]};
`;
