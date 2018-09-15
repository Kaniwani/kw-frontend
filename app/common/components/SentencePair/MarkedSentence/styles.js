import styled from 'styled-components';

import P from 'common/components/P';
import Mark from 'common/components/Mark';

import { transparent, grey, purple } from 'common/styles/colors';
import { gamma } from 'common/styles/typography';

export const Sentence = styled(P)`
  line-height: 1;
  color: ${grey[7]};
  ${gamma};
`;

export const VocabMark = styled(Mark).attrs({
  bgColor: transparent,
  color: purple[4],
  pad: false,
})``;
