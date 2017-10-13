import styled from 'styled-components';
import { gutter } from 'shared/styles/layout';

import { orange } from 'shared/styles/colors';

import { FormSection } from 'redux-form';

export const Form = styled.form`
  ${gutter()};
  display: flex;
  flex-flow: row wrap;
`;

export const Controls = styled.div`
  ${gutter()};
  flex: 1 0 100%;
`;

export const Section = styled(FormSection)`
  flex: 1 1 500px;
`;

export const SubSection = styled(FormSection)`
  ${gutter({ type: 'outer', position: 'vertical' })}
`;

export const Block = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: column nowrap;
`;

export const Label = styled.label`
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  & > * {
    ${gutter()}
    display: block;
  }
`;

export const Note = styled.div`
  ${gutter()}
  font-style: italic;
`;

export const ValidationMessage = styled.div`
  ${gutter()}
  flex: 1 0 100%;
  font-size: .9em;
  font-style: italic;
  color: ${orange};
`;
