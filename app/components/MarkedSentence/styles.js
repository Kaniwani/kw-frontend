import styled from 'styled-components';
import { rgba } from 'polished';

import P from 'base/P';
import Mark from 'base/Mark';

import { transparent, greyDark, purpleLight } from 'shared/styles/colors';
import { gamma } from 'shared/styles/typography';

export const Sentence = P.extend`
  line-height: 1;
  color: ${greyDark};
  ${gamma}
`;

export const VocabMark = styled(Mark)`
  background-color: ${transparent};
  color: ${rgba(purpleLight, 0.8)};
`;
