import H3 from 'base/H3';
import P from 'base/P';
import { gutter } from 'shared/styles/layout';

export const PrimaryMeaning = H3.extend`
  ${gutter()}
  text-transform: capitalize;
`;

export const SecondaryMeanings = P.extend`
  margin: 0;
  padding: 0 !important;
  font-style: italic;
`;
