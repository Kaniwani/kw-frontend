import H3 from 'base/H3';
import P from 'base/P';
import { gutter } from 'shared/styles/layout';

export const PrimaryMeaning = H3.extend`
  ${gutter()}
  text-transform: capitalize;
`;

export const SecondaryMeanings = P.extend`
  ${gutter({ position: 'horizontal' })}
  padding-top: 0 !important;
  margin: 0;
  font-style: italic;
`;
