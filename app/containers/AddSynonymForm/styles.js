import styled from 'styled-components';
import Element from 'components/Element';
import { red } from 'shared/styles/colors';

export const LabelText = styled(Element)`
  flex: 0 1 auto;
  text-align: right;
  & { padding-right: .6em; } /* extra specificity since elementGutter has media queries which would trump this */
`;

export const ValidationMessage = styled.div`
  flex: 1 0 100%;
  font-size: .8em;
  font-style: italic;
  color: ${red};
`;
