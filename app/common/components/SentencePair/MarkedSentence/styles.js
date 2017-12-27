import styled from 'styled-components';
import { rgba } from 'polished';

import P from 'common/components/P';
import Mark from 'common/components/Mark';

import { transparent, greyDark, purpleLight } from 'common/styles/colors';
import { gamma } from 'common/styles/typography';

export const Sentence = P.extend`
  line-height: 1;
  color: ${greyDark};
  ${gamma}
`;

export const VocabMark = styled(Mark)`
  background-color: ${transparent};
  color: ${rgba(purpleLight, 0.8)};
`;
