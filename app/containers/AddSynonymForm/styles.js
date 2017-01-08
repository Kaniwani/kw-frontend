import styled from 'styled-components';
import { elementGutter, containerGutterVertical } from 'shared/styles/layout';

export const Form = styled.form`
  ${elementGutter}
  text-align: center;
`;

export const Label = styled.label`
  ${elementGutter}
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const LabelText = styled.span`
  ${elementGutter}
  display: inline-block;
  flex: 0 1 auto;
  text-align: right;
  & { padding-right: .6em; } /* extra specificity since elementGutter has media queries which would trump this */
`;

export const ValidationMessage = styled.div`
  ${elementGutter}
  ${containerGutterVertical}
  flex: 1 0 100%;
  & > p {
    max-width: 100%;
    font-size: .8em;
    font-style: italic;
  }
`;
