import styled from 'styled-components';
import { media } from 'shared/styles/media';
import { unit } from 'shared/styles/sizing';
import { fluidType } from 'shared/styles/utils';
import { greyLight, black } from 'shared/styles/colors';

export const Form = styled.form`
  text-align: center;
  margin: ${unit.sm} auto 0;
  padding: 0 5%;
  ${media('min').md`
    margin-top: ${unit.lg};
  `}
`;

export const Label = styled.label`
  display: flex;
  margin-top: ${unit.sm};
  justify-content: center;
  align-items: center;
  align-content: center;

  ${media('min').lg`
    margin-top: ${unit.md};
  `}
`;

export const LabelText = styled.span`
  display: inline-block;
  flex: 0 1 auto;
  padding: 0;
  padding-right: .6em;
  text-align: right;
`;

export const Input = styled.input`
  display: inline-block;
  ${fluidType(16, 28)}
  appearance: none;
  line-height: 1.8; /* lowercase descenders are cut off otherwise */
  flex: 1 5 100px;
  vertical-align: middle;
  padding: 0 .5rem;
  border: 1px solid rgba(${greyLight}, .3);
  border-radius: 3px;
  box-shadow: inset 0 3px 20px -8px rgba(${black}, 0.3);
`;

export const Validation = styled.div`
  margin-top: ${unit.sm};
  padding: 0 1.2em;
  & > p {
    font-size: .8em;
    font-style: italic;
  }
  ${media('min').md`
    margin-top: ${unit.md};
  `}
`;

export const SubmitButton = styled.button`
  margin: .5rem auto 0;
  text-align: center;
  border: 1px solid rgb(${greyLight});

  ${media('min').md`
    margin-top: ${unit.md};
    margin-bottom: ${unit.md};
  `}
`;
