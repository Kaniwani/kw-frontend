import H3 from 'common/components/H3';
import P from 'common/components/P';
import { gutter } from 'common/styles/layout';

export const PrimaryMeaning = H3.extend`
  ${gutter()}
`;

export const SecondaryMeanings = P.extend`
  ${gutter({ position: 'horizontal' })}
  padding-top: 0 !important;
  margin: 0;
  font-style: italic;
`;
